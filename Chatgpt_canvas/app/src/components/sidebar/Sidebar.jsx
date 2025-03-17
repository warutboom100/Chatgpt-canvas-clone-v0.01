import React from 'react';
import './Sidebar.css';
import { getImageUrl } from "../../utils";

const Sidebar = () => {
    const messages = [
        { sender: 'user', text: 'สอนวิธีใช้งานหน่อย' },
        { sender: 'chatbot', text: 'เว็บไซต์ ChatGPT ของ OpenAI ใช้ฟอนต์หลักที่เรียกว่า "Inter" ซึ่งถูกออกแบบโดย Rasmus Andersson ฟอนต์ Inter ถูกออกแบบมาเพื่อการอ่านบนหน้าจอที่ชัดเจนและมีความสวยงาม ทั้งยังให้ความรู้สึกที่เป็นมิตรและเข้าถึงง่าย นอกจากนี้ยังรองรับภาษาและตัวอักษรหลากหลายประเภท ทำให้เหมาะสำหรับการใช้งานบนแพลตฟอร์มต่าง ๆ' },
        { sender: 'user', text: 'ลองเขียนบทความของน้องหมาหน่อย' },
        { sender: 'chatbot', text: 'กำลังประมวลผล...'},
       
    ];
  return (
    <div className="sidebar">
        <div className="header p-3">
            <div className="action">
                <img src={getImageUrl("icons/sidebar.png")} alt="logo"/>
                <img src={getImageUrl("icons/compose.png")} alt="logo" />
            </div>
            <h1>ModSom Canvas</h1>
        </div>
        <div className="chat-container">
            {messages.map((message, index) => (
                <div
                key={index}
                className={`chat-message ${message.sender === 'user' ? 'user' : 'chatbot'}`}
                >
                {message.sender === 'chatbot' ? (
                    <div className="chatbot-message">
                    <img src={getImageUrl("logo.png")} alt="Chatbot" />
                    <div className="message-content">
                        <p>{message.text}</p>
                    </div>
                    </div>
                ) : (
                    <div className="user-message">
                    <div className="message-content">
                        <p>{message.text}</p>
                    </div>
                    </div>
                )}
                </div>
            ))}
            </div>

        <div className="bottom-bar">
            <div className="input-section">
                <input type="text" placeholder="Message ChatGPT" className="message-input" />
            </div>
            <div className="icon-section">
                <div className='left-button'>
                    <img src={getImageUrl("icons/attach.png")} alt="Attach" className="icon" />
                    <img src={getImageUrl("icons/internet.png")} alt="Globe" className="icon" />

                </div>
                
                <div className="voice-icon">
                    <img src={getImageUrl("icons/up-arrow.png")} alt="Voice" />
                </div>
            </div>
        </div>

    </div>
  );
};

export default Sidebar;
