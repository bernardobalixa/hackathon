# MeningitisCare Hub 

## Problem

Meningitis is an inflammation of the protective membranes covering the brain and spinal cord, often caused by infections. A clear understanding of these indicators facilitates early detection, leading to prompt medical intervention. In severe forms, it can be very debilitating.


## Objective

Reduce the deegree of disability that patients with Meningitis most commonly have, aliviating their symptoms and improving their quality of life.

## Solution

We have developed a web app, built in node.js, that tries to tackle the problem mentioned above. It consists of a web page, where a user has access to some funcionalities, subdivided into 2 pages:
 - Identification: in this page, the user can complete a form, that, then, is processed, and uses Langchain to communicate with ChatGPT which returns the appropriate result, according to the symptoms selected in the form, presenting to the user the likelihood of having Meningitis;
 - Monitoring: in this page, the user can visit websites, that were suggested by ChatGPT(as if it was an expert in the health field, more specifically in the Meningitis field), and also retrieve a brief summary of the websites in question(also elaborated by ChatGPT). There is also a chat, where a user can ask questions regarding the Meningitis disease. The chat is done by means of instructing ChatGPT to assume a role of a health expert that answers questions submitted by the user, having the ability to follow a flow of conversation, remembering what was asked previously by the user.


Note: To inicialize the server use `npm start`
