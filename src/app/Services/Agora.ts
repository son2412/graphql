import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { Exception } from './Exception';

const appId = process.env.AGORA_APP_ID;
const appCertificate = process.env.AGORA_APP_CERTIFICATE;
const uid = 0;
const expirationTimeInSeconds = 3600;
const currentTimestamp = Math.floor(Date.now() / 1000);
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

export const PUBLISHER = RtcRole.PUBLISHER;
export const SUBSCRIBER = RtcRole.SUBSCRIBER;

export class Agora {
  constructor() {
    if (!process.env.AGORA_APP_ID || !process.env.AGORA_APP_CERTIFICATE) throw new Exception('No Setup Config Agora', 500);
  }

  static generateToken(params: { chanelName: string; role: number }) {
    console.log(appId, appCertificate, params.chanelName, typeof params.chanelName);
    return RtcTokenBuilder.buildTokenWithUid(
      process.env.AGORA_APP_ID,
      process.env.AGORA_APP_CERTIFICATE,
      params.chanelName,
      uid,
      params.role,
      privilegeExpiredTs
    );
  }
}
