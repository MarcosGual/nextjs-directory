import { formatShortDate } from '@/lib/utils';
import { EyeIcon, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { Author, Game } from '@/sanity/types';

export type GameCardType = Omit<Game, 'author'> & { author: Author };

const GameCard = ({ post }: { post: GameCardType }) => {
  const {
    _createdAt,
    views,
    title,
    description,
    likes,
    author: {
      _id: authorId,
      name,
      image: authorImage,
    },
    categories,
    _id,
    image
  } = post;

  return (
    <li className='game-card group'>
      <div className="flex-between">
        <p className="game_card_date">
          {formatShortDate(new Date(_createdAt))}
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
          <Image src={authorImage || "https://placehold.co/48x48.png"} alt="placeholder" width={48} height={48} className='rounded-full' />
        </Link>
      </div>

      <Link href={`/game/${_id}`}>
        <p className='game-card_desc'>
          {description}
        </p>
        <img src={image || "https://placehold.co/640x480.png"} alt='placeholder' className='game-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <div>
          {categories && categories.map((category, index) => {
            return (
              <Link key={index} href={`/?query=${category.toLowerCase()}`}>
                {/* <p className="text-16-medium">{category}</p> */}
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                  #{category}
                </span>
              </Link>)
          })}
        </div>
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