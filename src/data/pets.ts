
export interface Pet {
  id: number;
  name: string;
  type: 'Dog' | 'Cat' | 'Other';
  age: 'Young' | 'Adult' | 'Senior';
  gender: 'Male' | 'Female';
  size: 'Small' | 'Medium' | 'Large';
  breed: string;
  description: string;
  image: string;
}

export const pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Dog',
    age: 'Adult',
    gender: 'Male',
    size: 'Large',
    breed: 'Golden Retriever',
    description: 'Buddy is a friendly and playful Golden Retriever who loves to fetch and go on long walks.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2162&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Lucy',
    type: 'Cat',
    age: 'Young',
    gender: 'Female',
    size: 'Small',
    breed: 'Tabby',
    description: 'Lucy is a curious and affectionate kitten who enjoys cuddling and chasing laser pointers.',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Max',
    type: 'Dog',
    age: 'Senior',
    gender: 'Male',
    size: 'Medium',
    breed: 'Beagle',
    description: 'Max is a calm and gentle senior Beagle looking for a quiet home to spend his golden years.',
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2832&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Misty',
    type: 'Cat',
    age: 'Adult',
    gender: 'Female',
    size: 'Medium',
    breed: 'Siamese',
    description: 'Misty is a beautiful and vocal Siamese cat who loves to be the center of attention.',
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=2187&auto=format&fit=crop',
  },
    {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    age: 'Young',
    gender: 'Male',
    size: 'Medium',
    breed: 'Boxer Mix',
    description: 'A bundle of energy! Rocky loves to play and is looking for an active family.',
    image: 'https://images.unsplash.com/photo-1598133894008-61f75d584985?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Whiskers',
    type: 'Cat',
    age: 'Adult',
    gender: 'Male',
    size: 'Large',
    breed: 'Maine Coon',
    description: 'Gentle giant Whiskers is a fluffy and friendly companion who loves a good nap.',
    image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=2080&auto=format&fit=crop',
  },
];
