// src/ticket/create-ticket.dto.ts

export class UserInfoDTO {
    id: string;
    firstname: string;
    lastname: string;
    // Add other properties you need for the user
  }
  
  export class ConcertInfoDTO {
    id: string;
    concertName: string;
    date: Date;
    venue: string;
    // Add other properties you need for the concert
  }
  
  export class CreateTicketDTO {
    _id: String;
    userinfo: UserInfoDTO;
    concertinfo: ConcertInfoDTO;
  }