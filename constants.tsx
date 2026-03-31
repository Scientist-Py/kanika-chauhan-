import React from 'react';
import { Product } from './types';

export const MOST_BOUGHT: Product[] = [
  { id: 'mb1', title: 'Private Video Call', timing: '10 min', ordersPerWeek: 142, price: 4800, image: '', category: 'call', description: 'A personal 1-on-1 video call where we can talk about anything you want. No filters, just us.' },
  { id: 'mb2', title: 'Naughty Voice Call', timing: '10 min', ordersPerWeek: 89, price: 3000, image: '', category: 'call', description: 'Hear my voice whisper sweet (and spice) things in your ear. 10 minutes of pure audio bliss.' },
  { id: 'mb3', title: 'Flirty 1-on-1 Chat', timing: '15 min', ordersPerWeek: 215, price: 1800, image: '', category: 'chat', description: 'Text me directly for a quick chat. I will reply to your messages personally.' },
  { id: 'mb4', title: 'Custom Video For You', timing: 'Custom', ordersPerWeek: 56, price: 7200, image: '', category: 'content', description: 'I will record a personalized video just for you based on your script or request.' },
  { id: 'mb5', title: 'VIP Video Call', timing: '20 min', ordersPerWeek: 73, price: 9000, image: '', category: 'call', description: 'Premium quality video call with priority booking. Longer duration and more intimate vibe.' },
  { id: 'mb6', title: 'My Secret Photos', timing: '10 Photos', ordersPerWeek: 310, price: 3000, image: '', category: 'content', description: 'Unlock a hidden album of 10 photos that are too hot for Instagram.' },
];

export const MOST_UNLOCKED: Product[] = [
  { id: 'mu1', title: 'Exclusive Membership', timing: 'Monthly', ordersPerWeek: 420, description: 'Join my personal Telegram channel. I upload daily 10+ images and 3+ videos. They are not normal videos, they are enough to make you cum.', price: 936, image: '', category: 'subscription' },
  { id: 'mu2', title: 'Lets Talk on WhatsApp', timing: '1 Week', ordersPerWeek: 85, description: 'Lets talk on WhatsApp for 1 week. Naughty talks, everything allowed.', price: 3599, image: '', category: 'subscription' },
  { id: 'mu3', title: 'VIP Fan Club', timing: 'Lifetime', ordersPerWeek: 156, description: 'Get access to special discounts for lifetime. No personal content, only huge savings.', price: 1559, image: '', category: 'subscription' },
];

export const TRUST_ITEMS = [
  { label: '100% Private', icon: 'Lock' },
  { label: 'Secure Payment', icon: 'Card' },
  { label: 'No Data Sharing', icon: 'Shield' },
  { label: 'Discreet Billing', icon: 'Privacy' },
  { label: 'Direct Access', icon: 'Direct' },
];

export const EXCLUSIVES: Product[] = [
  { id: 'ex1', title: 'Red Lingerie Set', timing: '12 Photos, 5 Videos', ordersPerWeek: 198, price: 899, image: '', category: 'content', description: 'My fav red lingerie set. Very hot and spicy collection.' },
  { id: 'ex2', title: 'Pink Bra & Panty', timing: '8 Photos, 2 Videos', ordersPerWeek: 245, price: 636, image: '', category: 'content', description: 'Cute and naughty pink set. Showing off my curves.' },
  { id: 'ex3', title: 'Sheer White Nightwear', timing: '15 Photos, 4 Videos', ordersPerWeek: 167, price: 779, image: '', category: 'content', description: 'See through white nightwear. Very elegant and teasing.' },
  { id: 'ex4', title: 'Black Lace Bodysuit', timing: '25 Photos, 10 Videos', ordersPerWeek: 112, price: 1559, image: '', category: 'content', description: 'Tight black lace bodysuit. My hottest look ever.' },
];

export const SERVICES: Product[] = [];

export const NEW_COLLECTION: Product[] = [
  {
    id: 'nc-roleplay-1',
    title: 'Secretary & Boss Roleplay (Extreme) Eyeglasses Suit',
    timing: 'Up to 2HR 7MIN',
    ordersPerWeek: 512,
    price: 5499,
    image: '',
    category: 'service',
    description: 'Watch me getting fucked very hard in boss and secretary role. He liked my pussy very deeply and I cum on his face. I was really screaming like a hell and he make me squirt 7 times.',
    isNew: true,
    blur: true,
    priceOptions: [
      { label: '30 MIN (1 Time Squirt)', price: 5499 },
      { label: '45 MIN (2 Times Squirt)', price: 6999 },
      { label: 'FULL VIDEO (2HR 7MIN Long)', price: 8999 },
    ]
  },
  { id: 'nc-new-1', title: 'Stripping Black Saree', timing: '1 Hour', ordersPerWeek: 356, price: 3499, image: '', category: 'content', description: 'Delicious strip tease in a sheer black saree. Seeing me getting naked in traditional wear is every mans dream.', isNew: true, blur: true },
  { id: 'nc-new-3', title: 'Hot Red Dress Stripping', timing: '1 Hour', ordersPerWeek: 341, price: 3399, image: '', category: 'content', description: 'Slowly taking off my hot red dress. My curves look best in red before Im completely bare.', isNew: true, blur: true },
  { id: 'nc-new-4', title: 'Full 30 Min Extreme Play', timing: '30 min', ordersPerWeek: 289, price: 2399, image: '', category: 'content', description: 'Uncut 30 min of pure pleasure. Stripping my pink dress, playing with my wet pussy, and eating my own cum just for you.', isNew: true, blur: true },
  { id: 'nc1', title: '100 Images & 10 Videos', timing: 'Bundle', ordersPerWeek: 510, price: 3499, image: '', category: 'content', description: 'Exclusive new bundle pack containing 100 nude images and 10 videos.' },
  { id: 'nc6', title: 'Custom Time', timing: 'Max 2 Hour', ordersPerWeek: 123, price: 5799, image: '', category: 'service', description: 'Keep talking as much as you can. Keep cum how many times you can. Max limit 2 Hour.' },
];

export const VIP_SERVICES: Product[] = [
  { id: 'vs1', title: 'Personal WhatsApp Access', timing: 'Lifetime', ordersPerWeek: 34, price: 7799, image: '', category: 'service', description: 'Get direct access to my personal WhatsApp. Lets build a real connection.' },
  { id: 'vs2', title: 'Luxury Dinner Date (Offline)', timing: '1 Day', ordersPerWeek: 8, price: 14999, image: '', category: 'service', description: 'Experience an exclusive 1-day offline date with me in Delhi. Take me to a hotel or restaurant of your choice. Do whatever you want to do with me.' },
  { id: 'vs3', title: 'Wake Up Call Service', timing: '1 Week', ordersPerWeek: 89, price: 6799, image: '', category: 'service', description: 'Start your morning with my voice. Ill call you to wake you up every day for a week.' },
];
