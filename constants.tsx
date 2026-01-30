
import React from 'react';
import { Product } from './types';

import img1 from './images/Picsart_26-01-15_13-45-50-370.jpg';
import img2 from './images/Picsart_26-01-15_13-50-57-214.jpg';
import img3 from './images/Picsart_26-01-15_14-13-14-480.jpg';
import img4 from './images/Picsart_26-01-15_14-19-31-789.jpg';
import img5 from './images/Picsart_26-01-15_14-19-45-737.jpg';
import img6 from './images/Picsart_26-01-17_21-36-01-926.jpg';
import img7 from './images/Picsart_26-01-18_00-18-39-817.jpg';
import img8 from './images/SaveClip.App_610685032_18425295028118604_4722103354111989955_n.jpg';
import img9 from './images/kanika_6.jpeg';

// New arrivals
import imgNewSaree from './images/stripping black saree.png';
import imgRomance from './images/romancve with my partner.png';
import imgRedDress from './images/hot red dress stripping.png';
import imgPinkDressFull from './images/30 min stripping pink dress and fingering and cumminga nd eating cum.png';
import imgRoleplay from './images/grok_image_1769792356516.jpg';

// Map old names to new ones for compatibility if needed, but we'll update usages
const img30Images = img1;
const imgPlaying = img2;
const imgStrippingBlackDress = img3;
const imgStrippingBlackSaree = img4;
const imgVideoCall = img5;
const imgLetsHaveDirty = img6;
const imgChatGpt1 = img7;
const imgChatGpt2 = img8;
const imgEzGif = img9;

export const MOST_BOUGHT: Product[] = [
  { id: 'mb1', title: 'Private Video Call (10 min)', price: 4000, image: img1, category: 'call', description: 'A personal 1-on-1 video call where we can talk about anything you want. No filters, just us.' },
  { id: 'mb2', title: 'Naughty Voice Call', price: 2500, image: img2, category: 'call', description: 'Hear my voice whisper sweet (and spice) things in your ear. 10 minutes of pure audio bliss.' },
  { id: 'mb3', title: 'Flirty 1-on-1 Chat', price: 1500, image: img3, category: 'chat', description: 'Text me directly for a quick chat. I’ll reply to your messages personally for 15 mins.' },
  { id: 'mb4', title: 'Custom Video For You', price: 6000, image: img4, category: 'content', description: 'I will record a personalized video just for you based on your script or request.' },
  { id: 'mb5', title: 'VIP Video Call', price: 7500, image: img5, category: 'call', description: 'Premium quality video call with priority booking. Longer duration and more intimate vibe.' },
  { id: 'mb6', title: 'My Secret Photos', price: 2500, image: img6, category: 'content', description: 'Unlock a hidden album of 10 photos that are too hot for Instagram.' },
];

export const MOST_UNLOCKED: Product[] = [
  { id: 'mu1', title: 'Exclusive Membership', description: 'Join my personal Telegram channel. I upload daily 10+ images and 3+ videos. They are not normal videos, they are enough to make you cum. 💦', price: 780, image: imgChatGpt1, category: 'subscription' },
  { id: 'mu2', title: 'Lets Talk on WhatsApp', description: 'Lets talk on WhatsApp for 1 week. Naughty talks, everything allowed. 💬🫦', price: 2999, image: imgChatGpt2, category: 'subscription' },
  { id: 'mu3', title: 'VIP Fan Club', description: 'Get access to special discounts for lifetime. No personal content, only huge savings. (Example: Get 570 pack for 340). 🏷️✨', price: 1299, image: imgEzGif, category: 'subscription' },
];

export const TRUST_ITEMS = [
  { label: '100% Private', icon: '🔒' },
  { label: 'Secure Payment', icon: '💳' },
  { label: 'No Data Sharing', icon: '🛡️' },
  { label: 'Discreet Billing', icon: '🤫' },
  { label: 'Direct Access', icon: '✨' },
];

export const EXCLUSIVES: Product[] = [
  { id: 'ex1', title: 'Red Lingerie Set', itemsCount: '12 photos, 5 videos', price: 749, image: img7, category: 'content', description: 'My fav red lingerie set. Very hot and spicy collection. 🌶️❤️' },
  { id: 'ex2', title: 'Pink Bra & Panty', itemsCount: '8 photos, 2 videos', price: 530, image: img8, category: 'content', description: 'Cute and naughty pink set. Showing off my curves. 🎀🫦' },
  { id: 'ex3', title: 'Sheer White Nightwear', itemsCount: '15 photos, 4 videos', price: 649, image: img9, category: 'content', description: 'See through white nightwear. Very elegant and teasing. 🤍✨' },
  { id: 'ex4', title: 'Black Lace Bodysuit', itemsCount: '25 photos, 10 videos', price: 1299, image: img1, category: 'content', description: 'Tight black lace bodysuit. My hottest look ever. 🖤🔥' },
];

export const SERVICES: Product[] = [
  { id: 's1', title: 'Instagram Video Call (10 min)', price: 470, image: '', category: 'service', description: 'Connect with me on Instagram Video Call for 10 minutes. 📹📸' },
  { id: 's2', title: 'Instagram Video Call (20 min)', price: 560, image: '', category: 'service', description: 'Longer session. 20 Minutes Instagram Video Call. 📹✨' },
  { id: 's3', title: 'WhatsApp Private Video Call (15 min)', price: 590, image: '', category: 'service', description: 'Connect with me on WhatsApp for a private 1-on-1 video call. 15 minutes of pure fun. 📹🫦' },
  { id: 's4', title: 'Custom Request (Full Control)', price: 4600, image: '', category: 'service', description: 'You get my number. Call me, tell me what to wear, and then we connect on video call for 1 Hour. 👙📱' },
  { id: 's5', title: 'Offline Date (Delhi Only)', price: 6799, image: '', category: 'service', description: 'Offline date in Delhi only. Take me to a hotel or restaurant, your choice. Do whatever you want to do with me. 🏨🍽️💋' },
];




export const NEW_COLLECTION: Product[] = [
  {
    id: 'nc-roleplay-1',
    title: 'Secretary & Boss Roleplay (Extreme) 👓👔',
    price: 1899,
    image: imgRoleplay,
    category: 'service',
    description: 'Watch me getting fucked very hard in boss and secretary role. He liked my pussy very deeply and I cum on his face. I was really screaming like a hell and he make me squirt 7 times. 🔞💦👅',
    isNew: true,
    blur: true,
    priceOptions: [
      { label: '30 MIN (1 Time Squirt)', price: 1899 },
      { label: '45 MIN (2 Times Squirt)', price: 2799 },
      { label: 'FULL VIDEO (2HR 7MIN Long)', price: 4399 },
    ]
  },
  { id: 'nc-new-1', title: 'Stripping Black Saree 🥻🔞', price: 899, image: imgNewSaree, category: 'content', description: 'Delicious strip tease in a sheer black saree. Seeing me getting naked in traditional wear is every man\'s dream. 🥻🔞💦', isNew: true, blur: true },
  { id: 'nc-new-3', title: 'Hot Red Dress Stripping 👗❤️', price: 849, image: imgRedDress, category: 'content', description: 'Slowly taking off my hot red dress. My curves look best in red before I\'m completely bare. 👗❤️🔞', isNew: true, blur: true },
  { id: 'nc-new-4', title: 'Full 30 Min Extreme Play 💦🫦', price: 1999, image: imgPinkDressFull, category: 'content', description: 'Uncut 30 min of pure pleasure. Stripping my pink dress, playing with my wet pussy, and eating my own cum just for you. 💦👅🫦', isNew: true, blur: true },
  { id: 'nc1', title: '30 Images & 2 Videos 📸🔥', price: 570, image: img30Images, category: 'content', description: 'Exclusive new bundle pack containing 30 photos and 2 videos. 🗝️💋' },
  { id: 'nc2', title: 'Playing with Toy 🍆🫦', price: 630, image: imgPlaying, category: 'content', description: 'Naughty solo play video using my favorite toy. 💦🧸' },
  { id: 'nc3', title: 'Stripping Black Dress 👗🖤', price: 560, image: imgStrippingBlackDress, category: 'content', description: 'Slow strip tease in a elegant black dress. 👠💃' },
  { id: 'nc4', title: 'Stripping Black Saree 🥻🔞', price: 799, image: imgStrippingBlackSaree, category: 'content', description: 'Traditional strip tease in a sexy black saree. 🎞️🌹' },
  { id: 'nc5', title: 'Video Call Preview 📹💋', price: 530, image: imgVideoCall, category: 'content', description: 'A teaser of what my private video calls look like. 👀💖' },
  { id: 'nc6', title: 'Custom Time ⏳😈', price: 1499, image: imgLetsHaveDirty, category: 'service', description: 'Keep talking as much as you can. Keep cum how many times you can. Max limit 1 Hour. 🥵👄⛓️' },
];

export const VIP_SERVICES: Product[] = [
  { id: 'vs1', title: 'Personal WhatsApp Access', price: 4999, image: img2, category: 'service', description: 'Get direct access to my personal WhatsApp. Let\'s build a real connection. 📱💖' },
  { id: 'vs2', title: 'Luxury Dinner Date (Offline)', price: 6799, image: img3, category: 'service', description: 'Experience an exclusive 1-day offline date with me in Delhi. Take me to a hotel or restaurant of your choice. Do whatever you want to do with me. 🏨🍽️💋' },
  { id: 'vs3', title: 'Wake Up Call Service', price: 1500, image: img4, category: 'service', description: 'Start your morning with my voice. I\'ll call you to wake you up every day for a week. ☀️💋' },
];


