# 🏆 memer.ai - AI-powered Meme Generator for Twitter  

`memer.ai` is an AI-powered meme generator that connects with your Twitter account via OAuth, generates memes based on NLP prompts, and lets you decide whether to post them or not.  

## 🚀 How It Works  

The system operates in three core flows:  

### 1️⃣ Template Selection (RAG)  
- Uses Retrieval-Augmented Generation (RAG) to fetch relevant meme templates based on your input prompt.  
- Selects the best-fit template dynamically.  

### 2️⃣ Meme Data Retrieval & Text Generation  
- Extracts template metadata (e.g., number of input boxes, template ID, image URL).  
- Uses AI to generate text strings that align with the selected meme format.  

### 3️⃣ Tweet Composition & Posting  
- Works with composio tools to generate an engaging caption.  
- Prepares a tweet with the meme and allows the user to review before posting.  

## 🛠 Challenges We Faced  

- **Mira Network Stability:** The Mira network was often unstable, leading to issues in fetching data.  
- **New to AI Agents:** This was our first project leveraging AI agents, which came with a steep learning curve.  

## ⚠️ Known Issues  

🚨 Our final version is currently affected by **Mira Network downtimes**. If you experience failures, it's likely due to external service instability rather than a bug in our code.  

---

## 📝 Future Improvements  

- Improve resilience to external API failures.  
- Enhance meme template retrieval with more diverse datasets.  
- Expand to support more social platforms.  

---
