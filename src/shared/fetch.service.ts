import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchService {
  async requestData(url: string) {
    const response = await fetch(url);
    const formattedResponse = await response.json();
    return formattedResponse;
  }
}
