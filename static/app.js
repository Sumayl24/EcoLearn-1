// Chatbot
document.addEventListener('DOMContentLoaded', function(){
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  function addMessage(text, from='bot'){
    const div = document.createElement('div');
    div.className = 'chat-msg ' + from;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener('click', sendChat);
  chatInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter') sendChat();
  });

  function sendChat(){
    const message = chatInput.value.trim();
    if(!message) return;
    addMessage(message, 'user');
    chatInput.value = '';
    fetch('/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({message})
    }).then(r=>r.json()).then(data=>{
      addMessage(data.reply, 'bot');
    }).catch(err=>{
      addMessage('Network error. Try again.', 'bot');
    });
  }

  // Quiz submission handler (if on quiz page)
  const submitBtn = document.getElementById('submit-quiz');
  if(submitBtn){
    submitBtn.addEventListener('click', function(){
      const form = document.getElementById('quiz-form');
      const inputs = form.querySelectorAll('input[type=radio]:checked');
      const answers = {};
      inputs.forEach(inp=>{
        const name = inp.name.replace(/^q/,'');
        answers[name] = inp.value;
      });
      // get lesson id from URL
      const path = window.location.pathname.split('/');
      const lessonId = path[path.length-1];
      fetch('/submit-quiz/' + lessonId, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({answers})
      }).then(r=>r.json()).then(data=>{
        const resDiv = document.getElementById('quiz-result');
        resDiv.style.display = 'block';
        resDiv.innerHTML = `<strong>Score: ${data.score} / ${data.total}</strong><br/>`;
        data.feedback.forEach(f=>{
          resDiv.innerHTML += `<div>Q${f.id}: ${f.correct ? 'Correct' : 'Wrong'} (Answer: ${f.correct_answer})</div>`;
        });
      }).catch(err=>{
        alert('Error submitting quiz.');
      });
    });
  }
});