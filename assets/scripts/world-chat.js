document.addEventListener('DOMContentLoaded', async () => {
    const supabase = window.supabase ? window.supabase.createClient(
        'https://sgglpfgshlveyfbqfipy.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZ2xwZmdzaGx2ZXlmYnFmaXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjE2OTEsImV4cCI6MjA1NzkzNzY5MX0.fPynlb5orMDaH4SDyvwYNe5Wy82VDA3lVHPERxaxS0o'
    ) : null;

    if (!supabase) {
        console.error('Supabase library not loaded.');
        document.body.innerHTML = '<p>Oops, something broke!</p>';
        return;
    }

    const SERVER_URL = 'http://localhost:3000';
    const ADMIN_EMAIL = 'ujandey007@gmail.com';

    let user = null;
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError || !authUser) {
        console.error('Auth failed:', authError?.message);
        showPopup(authError ? `Login failed: ${authError.message}` : 'You gotta log in, bro!', 3000);
        setTimeout(() => window.location.href = '/index.html', 3000);
        return;
    }
    user = authUser;
    console.log('User authenticated:', user);

    const pusher = new Pusher('77ea7a0133da02d22aa5', {
        cluster: 'ap2',
        forceTLS: true
    });
    const channel = pusher.subscribe('world-chat');
    console.log('Subscribing to world-chat...');

    channel.bind('pusher:subscription_succeeded', () => {
        console.log('Subscription succeeded!');
        updateOnlineCounter(1);
    });
    channel.bind('pusher:subscription_error', (err) => {
        console.error('Subscription failed:', JSON.stringify(err));
        showPopup('Real-time chat failed—refresh, bro!', 3000);
    });
    channel.bind('new-message', (data) => {
        console.log('New message received:', data);
        appendChatMessage(data);
        scrollChatToBottom();
    });
    channel.bind('reaction', (data) => {
        console.log('Reaction received:', data);
        updateReaction(data);
    });
    channel.bind('pinned', (data) => {
        console.log('Pinned message received:', data);
        updatePinnedMessage(data.message);
    });
    channel.bind('delete-message', (data) => { // New event
        console.log('Delete message received:', data);
        const msgDiv = document.querySelector(`.chat-message[data-id="${data.id}"]`);
        if (msgDiv) msgDiv.remove();
    });

    pusher.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
        showPopup('Connection lost—check your net, bro!', 3000);
    });
    pusher.connection.bind('connected', () => {
        console.log('Pusher connected!');
    });

    document.querySelector('.loading-screen').style.display = 'none';

    const { data: messages } = await supabase.from('world_chat').select('*').order('created_at', { ascending: true }).limit(50);
    if (messages) messages.forEach(msg => appendChatMessage(msg));
    const { data: pinned } = await supabase.from('pinned_messages').select('message').order('created_at', { ascending: false }).limit(1);
    if (pinned && pinned.length) updatePinnedMessage(pinned[0].message);
    const { data: reactions } = await supabase.from('reactions').select('*');
    if (reactions) reactions.forEach(updateReaction);
    scrollChatToBottom();

    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    document.getElementById('send-chat-btn').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    const emojiPicker = document.getElementById('emoji-picker');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤓', '😎', '🥳',
        '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪',
        '😝', '🤑', '🤗', '🤭', '🤔', '🤐', '🤨', '😑', '😶', '😏',
        '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷',
        '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯',
        '🤠', '🥳', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖',
        '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
        '🙈', '🙉', '🙊', '🐵', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮',
        '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🦁', '🐯', '🐅', '🐆',
        '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷',
        '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒',
        '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️',
        '🦔', '🦇', '🐻', '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡',
        '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', '🕊️',
        '🦅', '🦆', '🦢', '🦉', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎',
        '🐍', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡',
        '🦈', '🐙', '🦑', '🦐', '🦞', '🦀', '🐚', '🐌', '🦋', '🐛',
        '🐜', '🐝', '🦗', '🕷️', '🕸️', '🦂', '🦟', '🦠', '💐', '🌸',
        '💮', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳',
        '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🔥',
        '⭐', '✨', '⚡', '☀️', '🌙', '☁️', '⛅', '☔', '❄️', '⛄'
    ];
    emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        span.onclick = () => {
            document.getElementById('chat-input').value += emoji;
            emojiPicker.classList.remove('show');
        };
        emojiPicker.appendChild(span);
    });
    emojiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        emojiPicker.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) {
            emojiPicker.classList.remove('show');
        }
    });

    function showPopup(message, duration = 2000) {
        const popup = document.getElementById('popup');
        popup.textContent = message;
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), duration);
    }

    function appendChatMessage(msg) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages || !msg.id) return;
        const div = document.createElement('div');
        div.className = 'chat-message';
        if (msg.user_id === user.id) div.classList.add('me');
        if (msg.type === 'shout') div.classList.add('shout');
        div.dataset.id = msg.id;
        div.innerHTML = `
            <strong>${msg.submitted_by}</strong>: ${msg.message}
            <div class="reactions"></div>
            ${msg.user_id === user.id ? '<button class="delete-btn"><i class="fas fa-trash"></i></button>' : ''}
        `;
        div.querySelector('.delete-btn')?.addEventListener('click', () => deleteChatMessage(msg.id));
        div.onclick = (e) => {
            if (!e.target.closest('.delete-btn')) showReactionPicker(div);
        };
        chatMessages.appendChild(div);
        while (chatMessages.children.length > 50) chatMessages.removeChild(chatMessages.firstChild);
        scrollChatToBottom();
    }

    const reactionMap = {};
    function updateReaction({ message_id, emoji, count }) {
        if (!reactionMap[message_id]) reactionMap[message_id] = {};
        reactionMap[message_id][emoji] = count;
        const msgDiv = document.querySelector(`.chat-message[data-id="${message_id}"]`);
        if (msgDiv) {
            const reactionsDiv = msgDiv.querySelector('.reactions');
            reactionsDiv.textContent = Object.entries(reactionMap[message_id])
                .map(([e, c]) => `${e} ${c}`)
                .join(' ');
        }
    }

    function updatePinnedMessage(message) {
        const pinned = document.getElementById('pinned-message');
        if (message) {
            pinned.textContent = message;
            pinned.style.display = 'block';
        } else {
            pinned.style.display = 'none';
        }
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
        const reactions = ['🔥', '😂', '👏'];
        reactions.forEach(emoji => {
            const span = document.createElement('span');
            span.textContent = emoji;
            span.onclick = () => addReaction(messageId, emoji);
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channel: 'world-chat',
                    event: 'reaction',
                    data: { message_id: messageId, emoji, count }
                })
            });
            if (!res.ok) throw new Error(`Reaction failed: ${res.statusText}`);
        } catch (err) {
            console.error('Reaction error:', err);
            showPopup('Reaction failed—check console!', 3000);
        }
    }

    async function sendChatMessage() {
        if (!user) {
            showPopup('Log in to chat, bro!');
            return;
        }
        let message = document.getElementById('chat-input').value.trim();
        if (!message) {
            showPopup('Type something, bro!');
            return;
        }

        const userName = user.user_metadata.name || user.email.split('@')[0];
        let msgData = {
            user_id: user.id,
            message,
            submitted_by: userName,
            created_at: new Date().toISOString()
        };

        if (message.startsWith('/')) {
            const [command, ...args] = message.slice(1).split(' ');
            if (command === 'shout') {
                msgData.message = args.join(' ');
                msgData.type = 'shout';
            } else if (command === 'pin' && user.email === ADMIN_EMAIL) {
                const pinMsg = args.join(' ');
                await supabase.from('pinned_messages').insert({ message: pinMsg });
                try {
                    const res = await fetch(`${SERVER_URL}/send-message`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            channel: 'world-chat',
                            event: 'pinned',
                            data: { message: pinMsg }
                        })
                    });
                    if (!res.ok) throw new Error(`Pin failed: ${res.statusText}`);
                    document.getElementById('chat-input').value = '';
                } catch (err) {
                    console.error('Pin error:', err);
                    showPopup('Pin failed—check console!', 3000);
                }
                return;
            } else if (command === 'clear') {
                document.getElementById('chat-input').value = '';
                return;
            }
        }

        try {
            const { data, error } = await supabase.from('world_chat').insert(msgData).select();
            if (error) throw new Error(`DB error: ${error.message}`);
            msgData.id = data[0].id;

            const res = await fetch(`${SERVER_URL}/send-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channel: 'world-chat',
                    event: 'new-message',
                    data: msgData
                })
            });
            if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
            const responseData = await res.json();
            if (responseData.success) {
                document.getElementById('chat-input').value = '';
            } else {
                throw new Error('Server rejected message');
            }
        } catch (err) {
            console.error('Send error:', err);
            showPopup(`Send failed: ${err.message}—check console!`, 3000);
        }
    }

    async function deleteChatMessage(messageId) { // New delete function
        try {
            const { data, error } = await supabase
                .from('world_chat')
                .select('user_id')
                .eq('id', messageId)
                .single();
            if (error) throw new Error(`Fetch error: ${error.message}`);
            if (data.user_id !== user.id) {
                showPopup('You can only delete your own messages, bro!', 3000);
                return;
            }

            const { error: deleteError } = await supabase
                .from('world_chat')
                .delete()
                .eq('id', messageId);
            if (deleteError) throw new Error(`Delete error: ${deleteError.message}`);

            const res = await fetch(`${SERVER_URL}/send-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    channel: 'world-chat',
                    event: 'delete-message',
                    data: { id: messageId }
                })
            });
            if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
            const responseData = await res.json();
            if (responseData.success) {
                const msgDiv = document.querySelector(`.chat-message[data-id="${messageId}"]`);
                if (msgDiv) msgDiv.remove();
            } else {
                throw new Error('Server rejected delete');
            }
        } catch (err) {
            console.error('Delete error:', err);
            showPopup(`Delete failed: ${err.message}—check console!`, 3000);
        }
    }
});