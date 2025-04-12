let player;
let currentTrackIndex = 0;
let isPlaying = false;
let currentAlbum = 'All';

const playlist = [
   { 
        songId: "VjJtH7xM8G4", 
        title: "Nanchaku", 
        artist: "Seedhe Maut ft. MC Stan", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "Ecs-foVS74Q", 
        title: "Kodak", 
        artist: "Seedhe Maut ft. King", 
        album: "Monopoly Moves (MM)", 
        art: "https://i.ytimg.com/vi/Ecs-foVS74Q/mqdefault.jpg" 
    },
    { 
        songId: "k-6ZDSIMEtY", 
        title: "Maina", 
        artist: "Seedhe Maut x Sez on the Beat", 
        album: "Nayaab", 
        art: "https://i.ytimg.com/vi/k-6ZDSIMEtY/mqdefault.jpg" 
    },
    { 
        songId: "1JzacUVA6w8", 
        title: "Tour Shit", 
        artist: "Seedhe Maut", 
        album: "Single", 
        art: "https://i.ytimg.com/vi/1JzacUVA6w8/mqdefault.jpg" 
    },
    { 
        songId: "vgpH9go537Q", 
        title: "TT/Shutdown", 
        artist: "Seedhe Maut", 
        album: "Single", 
        art: "https://i.ytimg.com/vi/vgpH9go537Q/mqdefault.jpg" 
    },
    { 
        songId: "VEQ-XJWiQMM", 
        title: "11K", 
        artist: "Seedhe Maut", 
        album: "Lunch Break", 
        art: "https://i.ytimg.com/vi/VEQ-XJWiQMM/mqdefault.jpg" 
    },
    {  
        songId: "sSENtdRAEK4",
        title: "Sick & Proper",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/sSENtdRAEK4/mqdefault.jpg"
    },
    {  
        songId: "7pNo-geT_MA",
        title: "Sick & Proper",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/7pNo-geT_MA/mqdefault.jpg"
    },
    {  
        songId: "HcdgHvBjR4c",
        title: "Peace of Mind",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/HcdgHvBjR4c/mqdefault.jpg"
    },
    {  
        songId: "94KgnOb-e8I",
        title: "Pushpak Vimaan",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/94KgnOb-e8I/mqdefault.jpg"
    },
    {  
        songId: "ah6Jfp0lnNQ",
        title: "Champions",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/ah6Jfp0lnNQ/mqdefault.jpg"
    },
   {  
        songId: "eoPhQicY0sA",
        title: "Baat Aisi Ghar Jaisi",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/eoPhQicY0sA/mqdefault.jpg"
    },
   {  
        songId: "eKbqvzxA",
        title: "Naam Kaam Sheher",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/eKbqvzxA/mqdefault.jpg"
    },
   {  
        songId: "2jgjmHByXsI",
        title: "Pain",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/2jgjmHByXsI/mqdefault.jpg"
    },
   {  
        songId: "dm2RHGYRtas",
        title: "Hausla",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/dm2RHGYRtas/mqdefault.jpg"
    },
   {  
        songId: "u1mTwf0SR0o",
        title: "Lunch Break",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/u1mTwf0SR0o/mqdefault.jpg"
    },
   {  
        songId: "JtH_-eRbCTE",
        title: "Asal G",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/JtH_-eRbCTE/mqdefault.jpg"
    },
   {  
        songId: "mcnko8o5PpA",
        title: "Swah!",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/mcnko8o5PpA/mqdefault.jpg"
    },
   {  
        songId: "D0vbzoYqQJY",
        title: "Focused Sedated",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/D0vbzoYqQJY/mqdefault.jpg"
    },
   {  
        songId: "FcmaxpvkSKo",
        title: "Taakat",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/FcmaxpvkSKo/mqdefault.jpg"
    },
   {  
        songId: "OHQnaPrDc7k",
        title: "Off Beat",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/OHQnaPrDc7k/mqdefault.jpg"
    },
   {  
        songId: "Ie6ODMbwSCo",
        title: "Luka Chippi",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/Ie6ODMbwSCo/mqdefault.jpg"
    },
   {  
        songId: "gpQe4jGwACY",
        title: "Khauf",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/gpQe4jGwACY/mqdefault.jpg"
    },
   {  
        songId: "adhIpm4nwKU",
        title: "I Don't Miss That Life",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/adhIpm4nwKU/mqdefault.jpg"
    },
   {  
        songId: "8A6Mhh1yTKw",
        title: "Akatsuki",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/8A6Mhh1yTKw/mqdefault.jpg"
    },
   {  
        songId: "EdBZx48EQWE",
        title: "Khoon",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/EdBZx48EQWE/mqdefault.jpg"
    },
   {  
        songId: "_9ITzdU4mlU",
        title: "'W'",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/_9ITzdU4mlU/mqdefault.jpg"
    },
   {  
        songId: "ADVNZM-qrT",
        title: "Joint In The Booth",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/ADVNZM-qrT/mqdefault.jpg"
    },
   {  
        songId: "qVcHlaFZf6A",
        title: "Khatta Flow",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/qVcHlaFZf6A/mqdefault.jpg"
    },
   {  
        songId: "0V9jdXKhgx0",
        title: "Kehna Chahte Hain...",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/0V9jdXKhgx0/mqdefault.jpg"
    },
   
    {  
        songId: "hJfQ-J6SLlk",
        title: "Dikkat",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/hJfQ-J6SLlk/mqdefault.jpg"
    },
    {  
        songId: "0O6lql2uHco",
        title: "Kya Challa",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/0O6lql2uHco/mqdefault.jpg"
    },
    {  
        songId: "hHbAvsLXyhc",
        title: "Fanne Khan",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/hHbAvsLXyhc/mqdefault.jpg"
    },
    {  
        songId: "jvAmSV0_VrQ",
        title: "First Place",
        artist: "Seedhe Maut",
        album: "Lunch Break",
        art: "https://i.ytimg.com/vi/jvAmSV0_VrQ/mqdefault.jpg"
    },

    { 
        songId: "YuWUJg3Kdks", 
        title: "Namastute", 
        artist: "Seedhe Maut x Sez on the Beat", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw"  
    },
    {  
        songId: "XCIYHCXQoxQ",
        title: "Red",
        artist: "Seedhe Maut",
        album: "Kshama",
        art: "https://i.ytimg.com/vi/XCIYHCXQoxQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCfH5HnxxT4hY1dVn0u7BZPUJZJTQ"
    },
    { 
        songId: "k9vnITNHqoM", 
        title: "Natkhat", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "5g4C7JNkRvE", 
        title: "Nafrat", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "3buqwoYKkL4", 
        title: "Namcheen", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "nTK0OEAzctM", 
        title: "Nawazuddin", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "GMGi2p63ga0", 
        title: "Nadaan", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "14DWUa_6BvI", 
        title: "Nazarbhattu Freestyle", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    { 
        songId: "t7XowdWvKfI", 
        title: "Na Jaaye", 
        artist: "Seedhe Maut", 
        album: "न (Na)", 
        art: "https://imgs.search.brave.com/RM3wy9NUaIMB5KzjSMNYKGwrUZUWnvECiLhutDsZmOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sYXN0/Zm0uZnJlZXRscy5m/YXN0bHkubmV0L2kv/dS8zMDB4MzAwLzQ1/YmIyNjVmNmEyODYw/MmVlM2FiMzk4MGQw/NzNlMTA1LmpwZw" 
    },
    {  
        songId: "AM0BdQZ4A8c",
        title: "Ice",
        artist: "Seedhe Maut",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "hLjlYKr6jVs",
        title: "Gourmet shit!",
        artist: "Seedhe Maut ft. Raftaar",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "ffywND5jorM",
        title: "Moon comes up",
        artist: "Seedhe Maut ft. Baadshah",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "aQS_yIptKAU",
        title: "Round 3",
        artist: "Seedhe Maut",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "l99lMQ0y05E",
        title: "Naraaz",
        artist: "Seedhe Maut",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "WIWwS6U-kHE",
        title: "Brahamachari",
        artist: "Seedhe Maut ft. Raga , GhAatak",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "oLzLSQZRZj4",
        title: "Shakti aur Kshama",
        artist: "Seedhe Maut",
        album: "Kshama",
        art: "/assets/images/kshama.png"
    },
    {  
        songId: "blJQvjUfDdg",
        title: "Nayaab",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
    songId: "7TCXqyCK6yE",
    title: "Toh Kya",
    artist: "Seedhe Maut",
    album: "Nayaab",
    art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "-zjSIPaHihk",
        title: "Hoshiyaar",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "GlDwK6cc",
        title: "Anaadi",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "Wsz28sZraTk",
        title: "Dum Ghutte",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "aOOZgIhVIKg",
        title: "Choti Soch",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "Nq0X7zlR14o",
        title: "Gandi Aulaad",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "e04zr2dpHdY",
        title: "Khoj",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "Dj2cCoSNovo",
        title: "Kohra",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "WtZ4_lCCTZU",
        title: "Jua",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "ShJq33LoWxg",
        title: "Rajdhani",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "nbw96QEJJGM",
        title: "Chidiya Udd",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "ang7r_Br8bY",
        title: "Batti",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "dYqx-GbFE5A",
        title: "Teen Dost",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "L9XS7BMo07k",
        title: "Marne Ke Baad Bhi…",
        artist: "Seedhe Maut",
        album: "Nayaab",
        art: "/assets/images/nayaab.jpeg"
    },
    {  
        songId: "JfqZ9R1pK-w",
        title: "Shaktiman",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "BJoXWZnxqEQ",
        title: "Gehraiyaan",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "5TGrPeQ3bHE",
        title: "Uss Din",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "a7IgUklG0KU",
        title: "Meri Baggi",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "QxbiSDStQzw",
        title: "Dehshat",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "3Qw7PfvxFWA",
        title: "PNP",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "x_pgqDX9eSc",
        title: "Pankh feat. Bawari Basanti",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "yOJQyZJcRso",
        title: "Kyu",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },
    {  
        songId: "ADZonRIa5Rk",
        title: "Chalta Reh",
        artist: "Seedhe Maut",
        album: "Bayaan",
        art: "/assets/images/bayaan.jpg"
    },





    
    
];

// Fallback image if album art fails
const fallbackImage = "https://via.placeholder.com/300x300.png?text=Seedhe+Maut";

// Get unique albums
function getAlbums() {
    return ['All', ...new Set(playlist.map(track => track.album))];
}

// Render Album List
function renderAlbumList() {
    const albumListEl = document.querySelector('#albumList');
    const albums = getAlbums();
    albumListEl.innerHTML = '';
    albums.forEach(album => {
        const li = document.createElement('li');
        li.textContent = album;
        li.className = album === currentAlbum ? 'active' : '';
        li.addEventListener('click', () => {
            currentAlbum = album;
            filterAndRenderPlaylist();
            albumListEl.querySelectorAll('li').forEach(item => {
                item.className = item.textContent === currentAlbum ? 'active' : '';
            });
        });
        albumListEl.appendChild(li);
    });
}

// Filter and Render Playlist
function filterAndRenderPlaylist() {
    const playlistEl = document.querySelector('#playlist');
    const filteredPlaylist = currentAlbum === 'All' ? playlist : playlist.filter(track => track.album === currentAlbum);
    playlistEl.innerHTML = '';
    filteredPlaylist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.className = index === currentTrackIndex && track.songId === playlist[currentTrackIndex].songId ? 'active' : '';
        li.addEventListener('click', () => loadAndPlay(filteredPlaylist.indexOf(track)));
        playlistEl.appendChild(li);
    });
}

// Load Track
function loadTrack(index) {
    const filteredPlaylist = currentAlbum === 'All' ? playlist : playlist.filter(track => track.album === currentAlbum);
    currentTrackIndex = (index < 0) ? filteredPlaylist.length - 1 : (index >= filteredPlaylist.length) ? 0 : index;
    const track = filteredPlaylist[currentTrackIndex];
    const trackTitle = document.querySelector('#trackTitle');
    const albumName = document.querySelector('#albumName');
    const albumArt = document.querySelector('#albumArt');
    const playerDiv = document.querySelector('#ytplayer');
    const loadingScreen = document.querySelector('#loadingScreen');

    trackTitle.textContent = track.title;
    albumName.textContent = `${track.artist} - ${track.album}`;
    albumArt.src = track.art;
    albumArt.onerror = () => {
        albumArt.src = fallbackImage;
    };
    playerDiv.innerHTML = `<iframe id="yt-iframe" src="https://www.youtube.com/embed/${track.songId}?enablejsapi=1&autoplay=0" frameborder="0" allowfullscreen></iframe>`;
    
    player = new YT.Player('yt-iframe', {
        events: {
            'onReady': (event) => {
                loadingScreen.style.display = 'none';
                if (isPlaying) event.target.playVideo();
            },
            'onStateChange': (event) => {
                if (event.data === YT.PlayerState.ENDED) loadAndPlay(currentTrackIndex + 1);
                isPlaying = event.data === YT.PlayerState.PLAYING;
                const playPauseBtn = document.querySelector('.play-pause');
                playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
            },
            'onError': (event) => {
                console.error(`Skipping ${track.title} - YouTube Error: ${event.data}`);
                loadAndPlay(currentTrackIndex + 1);
            }
        }
    });

    const playlistEl = document.querySelector('#playlist');
    playlistEl.querySelectorAll('li').forEach((li, i) => li.className = i === currentTrackIndex ? 'active' : '');
}

function togglePlayPause() {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
}

function loadAndPlay(index) {
    isPlaying = true;
    loadTrack(index);
}

function onYouTubeIframeAPIReady() {
    loadTrack(currentTrackIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.querySelector('.play-pause');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex - 1));
    nextBtn.addEventListener('click', () => loadAndPlay(currentTrackIndex + 1));

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    renderAlbumList();
    filterAndRenderPlaylist();
});
