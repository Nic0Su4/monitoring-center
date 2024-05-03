import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('emailService', () => {

  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  const emailService = new EmailService();

  test('should send an email', async () => {

    const options: SendMailOptions = {
      to: 'nicolas4.rayo@hotmail.com',
      subject: 'Test email',
      htmlBody: '<h1>Test email</h1>'
    }

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>Test email</h1>',
      subject: 'Test email',
      to: 'nicolas4.rayo@hotmail.com',
    });

  });

  test('send email with attachments', async () => {

    await emailService.sendEmailWithFileSystemLogs('nicolas4.rayo@hotmail.com');

    expect(mockSendMail).toHaveBeenCalledWith({
      to: 'nicolas4.rayo@hotmail.com',
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: 'logs-all.log',
          path: './logs/logs-all.log'
        },
        {
          filename: 'logs-high.log',
          path: './logs/logs-high.log'
        },
        {
          filename: 'logs-medium.log',
          path: './logs/logs-medium.log'
        },
      ])
    });

  })

})