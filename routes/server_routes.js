import express from 'express';
import dotenv from 'dotenv';
import { HumanMessage, SystemMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";

dotenv.config();

const router = express.Router();

router.use(express.json());

router.post("/abc", async (req, res) => {

	var request = req.body;

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
	const messages = [
		new SystemMessage(
			"Imagine you are evaluating a clinical case. I will send you a list of symptoms and you will return me a javascript array with the 3 most probable disease names, ordered by probability(from most probable to least probable), that corresponds to the group of symptoms. ONLY, return a javascript array with double quotes with the possible disease names."
		),
		new HumanMessage(request_array),
	]
	const meningitisTypes = [
		new SystemMessage("Imagine you are evaluating a clinical case. I will send you a list of symptoms and you will you will return me a javascript array, with the most probable Meningitis types, ordered by probability(from most probable to least probable), that correspond to that group of symptoms. ONLY, return a javascript array with double quotes with the possible Meningitis types."),
		new HumanMessage(request_array)
	]

	const chatModel = new ChatOpenAI({
        temperature: 0
    });

	try {
		const chatModelResult = await chatModel.predictMessages(messages);
		console.log(chatModelResult.content);
		var resposta = JSON.parse(chatModelResult.content);
		var respostaObj = {};
		var meningitis = resposta[0] == 'Meningitis' ? 2 : resposta.includes("Meningitis") ? 1 : 0;
		var respostas = resposta.filter(e => e != "Meningitis");

		respostaObj = {
			isMeningitis: meningitis,
			others: respostas
		};

		if (meningitis == 2) {
			const chatModelResult2 = await chatModel.predictMessages(meningitisTypes)
			console.log(chatModelResult2.content);
			var resposta2 = JSON.parse(chatModelResult2.content);

			respostaObj["meningitisTypes"] = resposta2;
		}
		res.json(respostaObj);
	} catch (error) {
		res.json({
			erro: true,
			message: error.toString()
		});
	}
});

export default router;