document.addEventListener('DOMContentLoaded', async () => {
    const SERVER_URL = 'https://tbsm41-backend.onrender.com';
    const ADMIN_EMAILS = ['ujandey007@gmail.com'];

    const supabase = window.supabase ? window.supabase.createClient(
        'https://sgglpfgshlveyfbqfipy.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZ2xwZmdzaGx2ZXlmYnFmaXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjE2OTEsImV4cCI6MjA1NzkzNzY5MX0.fPynlb5orMDaH4SDyvwYNe5Wy82VDA3lVHPERxaxS0o'
    ) : null;

    if (!supabase) {
        console.error('Supabase library not loaded.');
        document.body.innerHTML = '<p>Oops, something broke!</p>';
        return;
    }

    let user = null;
    let token = null;
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error('No user found');
        user = session.user;
        token = session.access_token; // Get token for backend auth
    } catch (err) {
        console.error('Auth failed:', err.message);
        showPopup('Please log in to chat!', 0);
        document.getElementById('chat-input').disabled = true;
        document.getElementById('send-chat-btn').disabled = true;
        document.getElementById('emoji-btn').disabled = true;
    }

    const reactionMap = {};

    if (user && token) {
        const pusher = new Pusher('77ea7a0133da02d22aa5', { cluster: 'ap2', forceTLS: true });
        const channel = pusher.subscribe('world-chat');

        channel.bind('pusher:subscription_succeeded', () => updateOnlineCounter(1));
        channel.bind('pusher:subscription_error', (err) => {
            console.error('Pusher subscription error:', err);
            showPopup('Real-time chat failed—refresh!', 3000);
        });
        channel.bind('new-message', (data) => {
            console.log('New message received:', data);
            appendChatMessage(data);
            scrollChatToBottom();
        });
        channel.bind('reaction', (data) => updateReaction(data));
        channel.bind('pinned', (data) => updatePinnedMessage(data.message));
        channel.bind('delete-message', (data) => {
            const msgDiv = document.querySelector(`.chat-message[data-id="${data.id}"]`);
            if (msgDiv) msgDiv.remove();
        });

        pusher.connection.bind('error', (err) => showPopup('Connection lost—check your net!', 3000));
        pusher.connection.bind('connected', () => console.log('Pusher connected!'));

        document.querySelector('.loading-screen').style.display = 'none';

        try {
            const { data: messages } = await supabase.from('world_chat').select('*').order('created_at', { ascending: true }).limit(50);
            if (messages) messages.forEach(appendChatMessage);
            const { data: pinned } = await supabase.from('pinned_messages').select('message').order('created_at', { ascending: false }).limit(1);
            if (pinned?.length) updatePinnedMessage(pinned[0].message);
            const { data: reactions } = await supabase.from('reactions').select('*');
            if (reactions) reactions.forEach(updateReaction);
            scrollChatToBottom();
        } catch (err) {
            console.error('Data load failed:', err);
            showPopup('Failed to load chat data', 3000);
        }

        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('active'));

        const sendBtn = document.getElementById('send-chat-btn');
        const chatInput = document.getElementById('chat-input');
        sendBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });

        const emojiPicker = document.getElementById('emoji-picker');
        const emojiBtn = document.getElementById('emoji-btn');
        const emojis = ['😀', '😂', '🔥', '👍', '❤️', '😮', '😢', '😡'];
        emojis.forEach(emoji => {
            const span = document.createElement('span');
            span.textContent = emoji;
            span.addEventListener('click', () => {
                chatInput.value += emoji;
                emojiPicker.classList.remove('show');
            });
            emojiPicker.appendChild(span);
        });
        emojiBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            emojiPicker.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) emojiPicker.classList.remove('show');
        });
    }

    function showPopup(message, duration = 2000) {
        const popup = document.getElementById('popup');
        popup.textContent = message;
        popup.classList.add('show');
        if (duration > 0) setTimeout(() => popup.classList.remove('show'), duration);
    }

    function appendChatMessage(msg) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages || !msg.id) {
            console.error('Invalid message data:', msg);
            return;
        }
        const div = document.createElement('div');
        div.className = `chat-message ${msg.user_id === user.id ? 'me' : 'other'} ${msg.type === 'shout' ? 'shout' : ''}`;
        div.dataset.id = msg.id;
        div.innerHTML = `
            <div class="message-content">
                <strong>${msg.submitted_by}</strong>: ${msg.message}
                <div class="reactions"></div>
            </div>
            ${msg.user_id === user.id ? '<button class="delete-btn" aria-label="Delete message"><i class="fas fa-trash"></i></button>' : ''}
        `;
        const deleteBtn = div.querySelector('.delete-btn');
        if (deleteBtn) deleteBtn.addEventListener('click', () => deleteChatMessage(msg.id));
        div.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-btn')) showReactionPicker(div);
        });
        chatMessages.appendChild(div);
        while (chatMessages.children.length > 50) chatMessages.removeChild(chatMessages.firstChild);
        scrollChatToBottom();
    }

    function updateReaction({ message_id, emoji, count }) {
        if (!reactionMap[message_id]) reactionMap[message_id] = {};
        reactionMap[message_id][emoji] = count;
        const msgDiv = document.querySelector(`.chat-message[data-id="${message_id}"]`);
        if (msgDiv) {
            const reactionsDiv = msgDiv.querySelector('.reactions');
            reactionsDiv.textContent = Object.entries(reactionMap[message_id])
                .map(([e, c]) => `${e} ${c}`)
                .join(' ');
        } else {
            setTimeout(() => updateReaction({ message_id, emoji, count }), 1000);
        }
    }

    function updatePinnedMessage(message) {
        const pinned = document.getElementById('pinned-message');
        pinned.textContent = message || '';
        pinned.style.display = message ? 'block' : 'none';
    }

    function scrollChatToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateOnlineCounter(count) {
        document.getElementById('online-counter').textContent = `${count} fans online`;
    }

    function showReactionPicker(div) {
        const messageId = div.dataset.id;
        const picker = document.createElement('div');
        picker.className = 'emoji-picker show';
        picker.style.position = 'absolute';
        picker.style.left = `${div.offsetLeft}px`;
        picker.style.top = `${div.offsetTop - 40}px`;
        const reactions = ['🔥', '😂', '👍'];
        reactions.forEach(emoji => {
            const span = document.createElement('span');
            span.textContent = emoji;
            span.addEventListener('click', () => addReaction(messageId, emoji));
            picker.appendChild(span);
        });
        document.body.appendChild(picker);
        setTimeout(() => picker.remove(), 2000);
    }

    async function addReaction(messageId, emoji) {
        try {
            const { data: existing } = await supabase
                .from('reactions')
                .select('count')
                .eq('message_id', messageId)
                .eq('emoji', emoji)
                .single();
            const count = existing ? existing.count + 1 : 1;
            await supabase.from('reactions').upsert({ message_id: messageId, emoji, count });
            const res = await fetch(`${SERVER_URL}/send-message`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ channel: 'world-chat', event: 'reaction', data: { message_id: messageId, emoji, count } })
            });
            if (!res.ok) throw new Error(await res.text());
        } catch (err) {
            console.error('Reaction error:', err);
            showPopup('Failed to add reaction', 3000);
        }
    }

    async function sendChatMessage() {
        if (!user) return showPopup('Log in to chat!', 3000);
        let message = document.getElementById('chat-input').value.trim();
        if (!message) return showPopup('Type something!', 3000);

        const userName = user.user_metadata.name || user.email.split('@')[0];
        let msgData = { user_id: user.id, message, submitted_by: userName, created_at: new Date().toISOString() };

        if (message.startsWith('/')) {
            const [command, ...args] = message.slice(1).split(' ');
            if (command === 'shout') {
                msgData.message = args.join(' ');
                msgData.type = 'shout';
            } else if (command === 'pin' && ADMIN_EMAILS.includes(user.email)) {
                const pinMsg = args.join(' ');
                try {
                    await supabase.from('pinned_messages').insert({ message: pinMsg });
                    const res = await fetch(`${SERVER_URL}/send-message`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ channel: 'world-chat', event: 'pinned', data: { message: pinMsg } })
                    });
                    if (!res.ok) throw new Error(await res.text());
                    document.getElementById('chat-input').value = '';
                } catch (err) {
                    console.error('Pin error:', err);
                    showPopup('Failed to pin message', 3000);
                }
                return;
            } else if (command === 'clear') {
                document.getElementById('chat-input').value = '';
                return;
            }
        }

        try {
            const { data, error } = await supabase.from('world_chat').insert(msgData).select();
            if (error) throw new Error(error.message);
            msgData.id = data[0].id;
            const res = await fetch(`${SERVER_URL}/send-message`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ channel: 'world-chat', event: 'new-message', data: msgData })
            });
            if (!res.ok) throw new Error(await res.text());
            const responseData = await res.json();
            if (responseData.success) {
                document.getElementById('chat-input').value = '';
            } else {
                throw new Error('Server confirmed but no success');
            }
        } catch (err) {
            console.error('Send error:', err);
            showPopup(`Failed to send: ${err.message}`, 3000);
            appendChatMessage(msgData); // Fallback
            scrollChatToBottom();
        }
    }

    async function deleteChatMessage(messageId) {
        try {
            const { data, error } = await supabase.from('world_chat').select('user_id').eq('id', messageId).single();
            if (error) throw new Error(error.message);
            if (data.user_id !== user.id) return showPopup('You can only delete your own messages!', 3000);

            const { error: deleteError } = await supabase.from('world_chat').delete().eq('id', messageId);
            if (deleteError) throw new Error(deleteError.message);

            const res = await fetch(`${SERVER_URL}/send-message`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ channel: 'world-chat', event: 'delete-message', data: { id: messageId } })
            });
            if (!res.ok) throw new Error(await res.text());
            const msgDiv = document.querySelector(`.chat-message[data-id="${messageId}"]`);
            if (msgDiv) msgDiv.remove();
        } catch (err) {
            console.error('Delete error:', err);
            showPopup(`Failed to delete: ${err.message}`, 3000);
        }
    }
});