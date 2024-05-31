import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ResourceRating } from '../entities/resource-rating.entity';
import { CreateResourceRatingDto } from '../models/create-resource-rating.model';
import { GetResourceRatingDto } from '../models/get-resource-rating.model';

@Injectable()
export class ResourcesRatingService {
  constructor(
    @InjectRepository(ResourceRating)
    private readonly resourceRatingRepository: Repository<ResourceRating>,
  ) {}

  async create(
    resourceRatingDto: CreateResourceRatingDto,
    resourceType: 'character' | 'comic' | 'series',
    user: User,
  ): Promise<void> {
    const exists = await this.find(
      resourceRatingDto.resourceId,
      resourceType,
      user,
    );
    if (exists !== null) {
      exists.rating = resourceRatingDto.rating;
      await this.resourceRatingRepository.save(exists);
      return;
    }
    const resourceRating = this.mapResourceRatingDto(
      resourceRatingDto,
      resourceType,
      user,
    );
    await this.resourceRatingRepository.save(resourceRating);
  }

  async get(
    resourceId: string,
    resourceType: 'character' | 'comic' | 'series',
  ): Promise<GetResourceRatingDto> {
    const ratings = await this.resourceRatingRepository.find({
      where: { resourceId, resourceType },
    });

    if (ratings.length === 0) {
      return {
        resourceId,
        totalRating: 0,
        totalRates: 0,
      };
    }

    const totalRates = ratings.length;
    const totalRating =
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRates;

    return {
      resourceId,
      totalRating,
      totalRates,
    };
  }

  async find(
    resourceId: string,
    resourceType: 'character' | 'comic' | 'series',
    user: User,
  ): Promise<ResourceRating | null> {
    return await this.resourceRatingRepository.findOne({
      where: { resourceId, resourceType, user },
    });
  }

  private mapResourceRatingDto(
    resourceRatingDto: CreateResourceRatingDto,
    resourceType: 'character' | 'comic' | 'series',
    user: User,
  ) {
    const { resourceId, rating } = resourceRatingDto;
    const resourceRating = new ResourceRating();
    resourceRating.resourceId = resourceId;
    resourceRating.resourceType = resourceType;
    resourceRating.rating = rating;
    resourceRating.user = user;
    return resourceRating;
  }
}
