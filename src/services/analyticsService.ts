import MongoDB from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export interface AnalyticsEvent {
  _id?: ObjectId;
  userId: string;
  businessId?: string;
  reviewId?: string;
  type: 'view' | 'demo_click' | 'engagement';
  metadata?: Record<string, any>;
  createdAt: Date;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async trackEvent(event: Omit<AnalyticsEvent, '_id' | 'createdAt'>) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<AnalyticsEvent>('analytics_events');

    const newEvent = {
      ...event,
      createdAt: new Date()
    };

    const result = await collection.insertOne(newEvent);
    return result;
  }

  async getBusinessAnalytics(businessId: string, startDate: Date, endDate: Date) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<AnalyticsEvent>('analytics_events');

    const pipeline = [
      {
        $match: {
          businessId,
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ];

    return collection.aggregate(pipeline).toArray();
  }

  async getHotLeads(businessId: string) {
    const db = MongoDB.getInstance().getDb();
    const collection = db.collection<AnalyticsEvent>('analytics_events');

    const pipeline = [
      {
        $match: {
          businessId,
          type: { $in: ['view', 'demo_click'] }
        }
      },
      {
        $group: {
          _id: '$userId',
          views: {
            $sum: { $cond: [{ $eq: ['$type', 'view'] }, 1, 0] }
          },
          demoClicks: {
            $sum: { $cond: [{ $eq: ['$type', 'demo_click'] }, 1, 0] }
          },
          lastActive: { $max: '$createdAt' }
        }
      },
      {
        $match: {
          $or: [
            { views: { $gte: 3 } },
            { demoClicks: { $gte: 1 } }
          ]
        }
      },
      {
        $sort: { demoClicks: -1, views: -1 }
      }
    ];

    return collection.aggregate(pipeline).toArray();
  }
}