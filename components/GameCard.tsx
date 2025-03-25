import { formatShortDate } from '@/lib/utils';
import { EyeIcon, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

export type GameCardType = {
  _id: number;
  _createdAt: Date;
  title: string;
  description: string;
  image: string;
  views: number;
  likes: number;
  author: {
    _id: number;
    name: string;
  };
  categories: [string];
  genre: string;
}

const GameCard = ({ post }: { post: GameCardType }) => {
  const { _createdAt, views, title, description, likes, author: { _id: authorId, name }, categories, _id, image } = post;

  return (
    <li className='game-card group'>
      <div className="flex-between">
        <p className="game_card_date">
          {formatShortDate(_createdAt)}
        </p>
        <div className={"flex gap-1.5"}>
          <ThumbsUp />
          <span className='text-16-medium'>{likes}</span>
        </div>
        <div className="flex gap-1.5">
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{name}</p>
          </Link>
          <Link href={`/game/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className='rounded-full' />
        </Link>
      </div>

      <Link href={`/game/${_id}`}>
        <p className='game-card_desc'>
          {description}
        </p>
        <img src={image} alt='placeholder' className='game-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${categories[0].toLowerCase()}`}>
          <p className="text-16-medium">{categories[0]}</p>
        </Link>
        <Button className='game-card_btn' asChild>
          <Link href={`/game/${_id}`}>
            Detalles
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default GameCard;