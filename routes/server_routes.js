import express from "express";
import dotenv from "dotenv";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";

dotenv.config();

const router = express.Router();

router.use(express.json());

const memory = new BufferMemory({returnMessages: true, memoryKey: "history"});

router.post("/sendMessage", async (req, res) => {
  var msg = req.body.msg;

  const chatPrompt = ChatPromptTemplate.fromMessages([
	[
	  "system",
	  "The following is a friendly conversation between a human and an AI. The AI is a specialist in the field of Meningitis Disease. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.",
	],
	new MessagesPlaceholder("history"),
	["human", "{input}"],
  ]);

  const model = new ChatOpenAI({ temperature: 0 });
  const chain = new ConversationChain({ llm: model, prompt: chatPrompt, memory: memory });

  res.send(await chain.call({ input: msg }));
});

router.get("/getSummary", async (req, res) => {
  const chatModel = new ChatOpenAI({
    temperature: 0,
  });

  const messages = [
    new SystemMessage(
      "Imagine you are a Meningitis expert. I will ask you for the 6 most informative websites about meningitis on the internet? You will return me, ONLY, a JSON array with an object with the parameters: name, url and summary. ONLY, send me the content of the JSON array, nothing more"
    ),
    new HumanMessage(
      "What are the 6 most informative websites about meningitis on the internet? Answer me only with the content of a JSON array and nothing more"
    ),
  ];

  const chatModelResult = await chatModel.predictMessages(messages);

  res.send(chatModelResult.content);
});

router.post("/abc", async (req, res) => {
  var request = req.body;

  var request_array = [];
  for (let key in request) {
    if (key != "headacheDuration") {
      if (request[key] == "yes") {
        request_array.push(key.split("_").join(" "));
      }
    } else {
      if (request[key] > 0)
        request_array.push("headache for " + request[key] + " days");
    }
  }

  request_array = request_array.join(", ");
  let messages = [
    new SystemMessage(
      "Imagine you are evaluating a clinical case. I will send you a list of symptoms and you will return me a javascript array with the 4 most probable disease names, ordered by probability(from most probable to least probable) that correspond to the group of symptoms. ONLY, return a javascript array with double quotes with the probable disease names."
    ),
    new HumanMessage(request_array),
  ];

  const chatModel = new ChatOpenAI({
    temperature: 0,
  });

  let respostaFinal;

  try {
    const chatModelResult = await chatModel.predictMessages(messages);
    var resposta = JSON.parse(chatModelResult.content);
    var meningitis =
      resposta[0] == "Meningitis" ? 2 : resposta.includes("Meningitis") ? 1 : 0;
    var respostas = resposta.filter((e) => e != "Meningitis");
    respostaFinal = {
      isMeningitis: meningitis,
      others: respostas,
    };
    if (meningitis == 2) {
      messages = [
        new SystemMessage(
          "Imagine you are evaluating a clinical case of meningitis. I will send you a list of symptoms and you will return me a javascript array with the 3 most probable types of meningitis(from most probable to least probable) that correspond to the group of symptoms. ONLY, return a javascript array with double quotes with the 3 most probable types."
        ),
        new HumanMessage(request_array),
      ];
      const chatModelResult2 = await chatModel.predictMessages(messages);
      respostaFinal.meningitisTypes = JSON.parse(chatModelResult2.content);
    }

    res.json(respostaFinal);
  } catch (error) {
    res.json({
      erro: true,
      message: error.toString(),
    });
  }
});

export default router;
