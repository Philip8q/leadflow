# Explain It Like You Built It — Philip Omondi

Brief: https://aifluency.flyrank.ai/week-06.html#explain-it-like-you-built-it
Date: 2026-08-27

The piece I picked: how the streaming AI chat actually works, end to end
(`app/demo/lead-chat/page.jsx` on the browser side,
[`app/api/chat/route.js`](../../../app/api/chat/route.js) on the server
side).

## In my own words

Imagine a restaurant kitchen where the dining room and the cooking area
are in two completely different buildings.

**The webpage (`page.jsx`) is the menu and the waiter.**
This part lives right inside your internet browser on your laptop or
phone. When you type a question and hit send, the browser acts like a
waiter taking your order and walking it over to the kitchen.

**The server code (`route.js`) is the head chef in the kitchen.**
This part doesn't live on your computer at all&mdash;it runs on a
powerful remote computer somewhere else on the internet. Its only job is
to take your order, talk to the AI brain, and cook up the response.

**Streaming is the open pass-through window.**
Normally, if you order a complex meal, you'd sit at your table and stare
at an empty plate for five minutes until the entire meal is cooked and
brought out all at once. But with streaming, the moment the chef
finishes chopping the very first potato, they slide it right through the
window to your table. Then the next piece, and the next.

Your browser catches these tiny pieces as they fly across the internet
network and instantly slaps them onto your screen one word at a time.
That rapid-fire delivery is why it looks like a tiny typing ghost is
writing out the answer live in front of you.
