from azure.communication.email import EmailClient
#from dotenv import load_dotenv
#import os
#esta clase en la rama main puede generar errores pues esta configurada con mis credenciales Att:milton


class Send_email:

    def __init__(self, message, recipient, subject_line = "2FA Code"):
        self.message = message
        self.recipient = recipient
        self.subject_line = subject_line

    def send_the_email(self):
        response = False
        #load_dotenv()
        try:
            connection_string = "endpoint=https://38790-notifications.unitedstates.communication.azure.com/;accesskey=LU38XaoGqpeNvUO86CnxSoMm54oSC6jVnOM2NXTOyW1DqM7wTVRmGQdYiHXrPUdNLq9kvXkFZVUt0MAz+KxSTA=="
            client = EmailClient.from_connection_string(connection_string)

            message = {
                "senderAddress": "DoNotReply@9a4142d7-c419-457e-a814-cd274e2e221f.azurecomm.net", 
                "recipients": {
                    # "to": [{"address": recipient} for recipient in self.recipient],
                    "to": [{"address": self.recipient}],
                },
                "content": {
                    "subject": self.subject_line,
                    "plainText": self.message,
                    # "html": self.board_to_html(),
                }
            }

            poller = client.begin_send(message)
            result = poller.result()  # noqa: F841
            response = True

        except Exception as ex:
            print(ex)

        return response

    