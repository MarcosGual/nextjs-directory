import { formatDate } from '@/lib/utils';
import { EyeIcon, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export type GameCardType = {
  _id: number;
  title: string;
  image: string;
  _createdAt: Date;
  views: number;
  likes: number;
  author: {
    _id: number;
    name: string;
  };
  category: string;
  genre: string;
}

const GameCard = ({ post }: { post: GameCardType }) => {
  const { _createdAt, views, likes, author: { _id: authorId, name }, category, _id, image } = post;

  return (
    <li className='startup-card group'>
      <div className="flex-between">
        <p className="startup_card_date">
          {formatDate(post._createdAt)}
        </p>
        <div className={"flex gap-1.5"}>
          <ThumbsUp />
          <span className='text-16-medium'>{post.likes}</span>
        </div>
        <div className="flex gap-1.5">
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{post.views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{post.author?.name}</p>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default GameCard