import { formatDate } from '@/lib/utils';
import { EyeIcon, ThumbsUp } from 'lucide-react';
import React from 'react'

export type GameCardType = {
  _createdAt: Date;
}

const GameCard = ({ post }: { post: GameCardType }) => {
  return (
    <li className='startup-card group'>
      <div className="flex-between">
        <p className="startup_card_date">
          {formatDate(post._createdAt)}
        </p>
        <div className={"flex gap-1.5"}>
          <ThumbsUp />
          <span>{post.likes}</span>
        </div>
        <div className="flex gap-1.5">
          <EyeIcon className='size-6 text-primary' />
          <span>{post.views}</span>
        </div>
      </div>
    </li>
  )
}

export default GameCard