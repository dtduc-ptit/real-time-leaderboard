import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors.map(err => ({
        field: err.property,
        errors: Object.values(err.constraints || {}),
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    return value;
  }

    private shouldValidate(type: any): boolean {
      const skipTypes: Function[] = [String, Boolean, Number, Array, Object];
      return type && !skipTypes.includes(type);
    }
}
