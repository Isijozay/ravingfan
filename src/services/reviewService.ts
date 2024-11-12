import MongoDB from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Review {
  _id?: ObjectId;
  userId: string;
  type: 'business' | 'lifestyle';
  title: string;
  description: string;
  category: string;
  rating: number;
  videoUrl: string;
  createdAt: Date;
  views: number;
  likes: number;
  comments: number;
}

export class ReviewService {
  private static instance: ReviewService;
  private constructor() {}

  public static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  async createReview(review: Omit<Review, '_id' | 'createdAt' | 'views' | 'likes' | 'comments'>) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<Review>('reviews');

    const newReview = {
      ...review,
      createdAt: new Date(),
      views: 0,
      likes: 0,
      comments: 0
    };

    const result = await collection.insertOne(newReview);
    return result;
  }

  async getReviewsByUser(userId: string) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<Review>('reviews');
    
    return collection.find({ userId }).sort({ createdAt: -1 }).toArray();
  }

  async getReviewsByCategory(category: string) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<Review>('reviews');
    
    return collection.find({ category }).sort({ createdAt: -1 }).toArray();
  }

  async updateReviewStats(reviewId: string, stats: Partial<Pick<Review, 'views' | 'likes' | 'comments'>>) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<Review>('reviews');
    
    return collection.updateOne(
      { _id: new ObjectId(reviewId) },
      { $inc: stats }
    );
  }
}