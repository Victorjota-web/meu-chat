import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Send, Calendar, Trophy, Users, Bell, MessageSquare } from 'lucide-react';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <FuriaChatDemo />
    </div>
  );
}

function FuriaChatDemo() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Bem-vindo ao chat dos fãs da FURIA! Estamos aqui para te manter atualizado sobre tudo relacionado ao nosso time favorito de CS.',
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: 2,
      sender: 'bot',
      message: 'Hoje temos um jogo importante contra a Liquid às 19h! Você pode acompanhar aqui no chat e interagir com outros fãs.',
      timestamp: new Date(Date.now() - 200000).toISOString(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [notifications, setNotifications] = useState(true);
  
  const upcomingMatches = [
    {
      id: 1,
      opponent: 'Team Liquid',
      tournament: 'ESL Pro League',
      date: '2025-04-25T19:00:00',
      isLive: true,
      score: {
        furia: 7,
        opponent: 5
      }
    },
    {
      id: 2,
      opponent: 'NAVI',
      tournament: 'BLAST Premier',
      date: '2025-04-27T16:00:00',
    },
    {
      id: 3,
      opponent: 'Cloud9',
      tournament: 'ESL Pro League',
      date: '2025-04-30T20:00:00',
    }
  ];
  
  const newsItems = [
    {
      id: 1,
      title: 'FURIA se classifica para o Major!',
      preview: 'Após uma série emocionante, FURIA garante vaga no próximo Major de Counter-Strike.',
      date: '2025-04-20T14:30:00',
    },
    {
      id: 2,
      title: 'Nova contratação: bienvenido Santino!',
      preview: 'FURIA anuncia a contratação do jogador argentino para reforçar o elenco.',
      date: '2025-04-15T10:00:00',
    }
  ];
  
  const teamMembers = [
    { id: 1, nickname: 'arT', name: 'Andrei Piovezan', role: 'Capitão/IGL' },
    { id: 2, nickname: 'yuurih', name: 'Yuri Santos', role: 'Rifler' },
    { id: 3, nickname: 'KSCERATO', name: 'Kaike Cerato', role: 'Rifler' },
    { id: 4, nickname: 'chelo', name: 'Marcelo Cespedes', role: 'Entry Fragger' }
  ];

 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      let botMessage = "Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre o time, próximas partidas ou notícias recentes!";
      
      
      const input = inputMessage.toLowerCase();
      if (input.includes("próximo jogo") || input.includes("partida") || input.includes("quando")) {
        botMessage = "O próximo jogo da FURIA é contra Team Liquid hoje às 19h pela ESL Pro League! Você pode acompanhar ao vivo aqui no chat.";
      } else if (input.includes("quem") && input.includes("jogador")) {
        botMessage = "O time atual da FURIA é composto por arT (capitão), yuurih, KSCERATO, chelo e drop, com guerri como coach.";
      } else if (input.includes("ganhar") || input.includes("vencer")) {
        botMessage = "A FURIA tem boas chances! O time está em ótima forma nas últimas semanas e está em terceiro lugar no ranking mundial atualmente.";
      }
      
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        message: botMessage,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };


  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="chat-container">
    
      <header className="chat-header">
        <div className="header-left">
          <div className="logo-icon">F</div>
          <h1 className="header-title">FURIA Fan Chat</h1>
        </div>
        <div className="header-right">
          <button
            onClick={() => setNotifications(!notifications)}
            className={`notification-btn ${notifications ? 'active' : ''}`}
          >
            <Bell size={16} color="white" />
          </button>
        </div>
      </header>

     
      <nav className="nav-tabs">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
        >
          <MessageSquare size={14} className="tab-icon" /> Chat
        </button>
        <button 
          onClick={() => setActiveTab('matches')}
          className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
        >
          <Calendar size={14} className="tab-icon" /> Partidas
        </button>
        <button 
          onClick={() => setActiveTab('news')}
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
        >
          <Trophy size={14} className="tab-icon" /> Notícias
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
        >
          <Users size={14} className="tab-icon" /> Elenco
        </button>
      </nav>

      <div className="content-area">
        
        {activeTab === 'chat' && (
          <>
            
            <div className="live-match-banner">
              <div className="match-team">
                <span className="live-dot"></span>
                <span className="team-name">FURIA vs Team Liquid</span>
              </div>
              <div className="match-score">
                <div className="score-display">
                  <span className="furia-score">7</span>
                  <span className="score-divider">-</span>
                  <span className="opponent-score">5</span>
                </div>
              </div>
            </div>
            
           
            <div className="messages-container">
              <div className="messages-list">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`message-wrapper ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div 
                      className={`message-bubble ${
                        msg.sender === 'user' 
                          ? 'user-bubble' 
                          : msg.highlight 
                            ? 'highlight-bubble' 
                            : 'bot-bubble'
                      }`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="sender-name">
                          {msg.highlight ? 'FURIA Bot' : 'FURIA Fan'}
                        </div>
                      )}
                      <p className="message-text">{msg.message}</p>
                      <div className="message-time">
                        {formatDate(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </>
        )}
        
 
        {activeTab === 'matches' && (
          <div className="tab-content">
            <h2 className="section-title">Próximas Partidas</h2>
            
            <div className="matches-list">
              {upcomingMatches.map((match) => (
                <div 
                  key={match.id}
                  className={`match-card ${match.isLive ? 'live-match' : ''}`}
                >
                  <div className="match-details">
                    <div className="match-header">
                      <div className="match-teams">
                        {match.isLive && <span className="live-indicator"></span>}
                        <h3 className="match-title">FURIA vs {match.opponent}</h3>
                      </div>
                      <p className="match-tournament">{match.tournament}</p>
                      <p className="match-date">{formatDate(match.date)}</p>
                    </div>
                    
                    {match.isLive ? (
                      <div className="match-live-score">
                        <span className="furia-score">{match.score.furia}</span>
                        <span className="score-separator">-</span>
                        <span className="opponent-score">{match.score.opponent}</span>
                      </div>
                    ) : (
                      <button className="reminder-btn">
                        Lembrar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
  
        {activeTab === 'news' && (
          <div className="tab-content">
            <h2 className="section-title">Últimas Notícias</h2>
            
            <div className="news-list">
              {newsItems.map((news) => (
                <div 
                  key={news.id}
                  className="news-card"
                >
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-preview">{news.preview}</p>
                  <div className="news-footer">
                    <span className="news-date">{formatDate(news.date)}</span>
                    <button className="read-more-btn">Ler mais</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
    
        {activeTab === 'team' && (
          <div className="tab-content">
            <h2 className="section-title">Elenco Atual</h2>
            
            <div className="team-grid">
              {teamMembers.map((player) => (
                <div 
                  key={player.id}
                  className="player-card"
                >
                  <div className="player-avatar">
                    {player.nickname.charAt(0)}
                  </div>
                  <div className="player-info">
                    <h3 className="player-nickname">{player.nickname}</h3>
                    <p className="player-name">{player.name}</p>
                    <p className="player-role">{player.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    
      {activeTab === 'chat' && (
        <div className="input-area">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            placeholder="Digite sua mensagem..."
            className="message-input"
          />
          <button 
            onClick={handleSendMessage}
            className="send-button"
          >
            <Send size={16} />
          </button>
        </div>
      )}
      
    
      <footer className="chat-footer">
        <p>2.145 fãs online | Próxima partida: FURIA vs Team Liquid (hoje às 19h)</p>
      </footer>
    </div>
  );
}

export default App;