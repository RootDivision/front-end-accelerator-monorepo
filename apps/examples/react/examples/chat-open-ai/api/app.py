# pip install fastapi
# pip install uvicorn
import json
from fastapi import FastAPI, Depends
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from typing import Any, List, Optional
import asyncio

app = FastAPI()

# Dummy permission dependency
async def chat_auth():
    return True

async def feedback_auth():
    return True

# Models
class ChatInferenceRequest(BaseModel):
    text: str
    user_id: str = "public"
    session_id: Optional[str] = None
    use_case: Optional[str] = None
    chat_history: Optional[List[str]] = None
    metadata: Optional[dict[str, Any]] = None

class FeedbackRequest(BaseModel):
    sentiment: str
    custom_feedback: Optional[str] = None
    user_id: str = "public"
    session_id: Optional[str] = None
    message_id: Optional[str] = None
    chat_history: Optional[List[str]] = None
    metadata: Optional[dict[str, Any]] = None

# Chat Router
@app.post("/infer-text-stream", response_class=StreamingResponse)
async def infer_text_stream(request: ChatInferenceRequest, permissions=Depends(chat_auth)):
    async def dummy_stream():
        # Simulating the initial metadata object
        yield json.dumps({
            "message_id": "09a33847-abdc-4d3e-be80-1ed9b9d8c953",
            "session_id": "b291fa82-7c8d-4622-abf7-ee0c33aac80e"
        }) + "\n"
        
        # Simulating streaming chunks of text
        dummy_chunks = [
            {"text": ""},
            {"text": "I"},
            {"text": "'m"},
            {"text": " sorry"},
            {"text": ","},
            {"text": " but"},
            {"text": " I"},
            {"text": " cannot"},
            {"text": " generate"},
            {"text": " a"},
            {"text": " long"},
            {"text": " story"},
            {"text": " [[2]]"}
        ]
        for chunk in dummy_chunks:
            yield json.dumps(chunk) + "\n"
            await asyncio.sleep(0.1)  # Simulate delay between chunks
        yield json.dumps({"data": [{"data_type": "citation", "key": "[[1]]", "uri": "http://facebook.com/tessa.ickx", "content": "<h3>Citation [[1]]</h3><a href=\"http://facebook.com/tessa.ickx\" target=\"_blank\">http://facebook.com/tessa.ickx</a> <br/><br/><p>Part: 1</p><p>html \n \n \n \n </p>"}, {"data_type": "citation", "key": "[[2]]", "uri": "http://clocktab.com/terms", "content": "<h3>Citation [[2]]</h3><a href=\"http://clocktab.com/terms\" target=\"_blank\">http://clocktab.com/terms</a> <br/><br/><p>Part: 1</p><p>html</p>"}, {"data_type": "citation", "key": "[[3]]", "uri": "http://clocktab.com/privacy-policy", "content": "<h3>Citation [[3]]</h3><a href=\"http://clocktab.com/privacy-policy\" target=\"_blank\">http://clocktab.com/privacy-policy</a> <br/><br/><p>Part: 1</p><p>html</p>"}, {"data_type": "citation", "key": "[[4]]", "uri": "http://clocktab.com/conduct", "content": "<h3>Citation [[4]]</h3><a href=\"http://clocktab.com/conduct\" target=\"_blank\">http://clocktab.com/conduct</a> <br/><br/><p>Part: 1</p><p>html</p>"}, {"data_type": "citation", "key": "[[5]]", "uri": "http://clocktab.com/privacy-policy", "content": "<h3>Citation [[5]]</h3><a href=\"http://clocktab.com/privacy-policy\" target=\"_blank\">http://clocktab.com/privacy-policy</a> <br/><br/><p>Part: 6</p><p>. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations. <br/><b>Social Sharing Features </b><br/>The Services may offer social sharing features and other integrated tools, which let you share actions you take on our Services with other media, and vice versa. Your use of such features enables the sharing of information with your friends or the public, depending on the settings you establish with the entity that provides the social sharing feature. For more information about the purpose and scope of data collection and processing in connection with social sharing features, please visit the privacy policies of the entities that provide these features. <br/><b>Security </b><br/>Clock Tab takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. <br/><b>Transfer of Information to Germany and Other Countries </b><br/>Clock Tab is based in Germany and the information we collect is governed by the laws of Germany. By accessing or using the Services or otherwise providing information to us, you consent to the processing, transfer and storage of information in and to Germany and other countries, where you may not have the same rights and protections as you do under local law. <br/><b>Cookies </b><br/>Cookies are very small text files used by Internet pages, which your browser stores on your computer and which provide certain information from the place where the cookie is set (here by us). Cookies cannot run programs or transmit viruses to your computer. Transient cookies are automatically deleted when you close your browser. This particularly includes session cookies. Session cookies store a session ID, with which different requests from your browser can be assigned to the common session. This means that your computer can be recognized when you return to our website</p>"}, {"data_type": "citation", "key": "[[6]]", "uri": "http://clocktab.com/terms", "content": "<h3>Citation [[6]]</h3><a href=\"http://clocktab.com/terms\" target=\"_blank\">http://clocktab.com/terms</a> <br/><br/><p>Part: 4</p><p>any applicable local, state, national or international law, <li> \"stalk\" or otherwise harass another; and/or </li><li> collect or store personal data about other users in connection with the prohibited conduct and activities set forth in paragraphs above</li></p>"}]})

    return StreamingResponse(dummy_stream(), media_type="application/json")

# Feedback Router
@app.post("/feedback", response_class=JSONResponse)
async def add_feedback(request: FeedbackRequest, permissions=Depends(feedback_auth)):
    print("[Feedback_router] Request: ", request)
    # Dummy feedback addition
    return {"message": "Feedback has been added."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
