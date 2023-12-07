import express from 'express';
import dotenv from 'dotenv';
import { HumanMessage, SystemMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PythonShell } from 'python-shell';

dotenv.config();

const router = express.Router();

router.use(express.json());

router.post("/abc", async (req, res) => {

	var request = req.body;

	var request_string = "Imagine you are evaluating a clinical case. I will send you a list of symptoms and you will return me a javascript array with the possible disease names that correspond to the group of symptoms. ONLY, return a javascript array with the possible disease names. The symptoms are: \n";
	var request_array = [];
	for (let key in request) {
		if (key != "headacheDuration") {
			if (request[key] == "yes") {
				request_array.push(key.split("_").join(" "));
			}
		}
		else {
			if (request[key] > 0)
			    request_array.push("headache for " + request[key] + " days");
		}
	}

	request_array = request_array.join(', ');
	request_string += request_array;
	console.log(request_string);
	const messages = [
		new SystemMessage(
			"Imagine you are evaluating a clinical case. I will send you a list of symptoms and you will return me a javascript array with the most probable disease name that correspond to the group of symptoms. ONLY, return a javascript array with double quotes with the possible disease name."
		),
		new HumanMessage(request_array),
	]

	const chatModel = new ChatOpenAI({
        temperature: 0
    });

	try {
		const chatModelResult = await chatModel.predictMessages(messages);
		var resposta = JSON.parse(chatModelResult.content);
		var meningitis = resposta[0] == "Meningitis" ? 2 : resposta.includes("Menigitis") ? 1 : 0;
		var respostas = resposta.filter(e => e != "Meningitis");
		res.json({
			isMeningitis: meningitis,
			others: respostas
		});
	} catch (error) {
		res.json({
			erro: true,
			message: error.toString()
		});
	}
});

export default router;