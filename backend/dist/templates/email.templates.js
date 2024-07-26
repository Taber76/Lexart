"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../config/environment");
class EmailTemplates {
    static verifyEmail(code) {
        return `
    <p>Welcome to GoEvent!</p>
    <p>To verify your account, use the key provided below:</p>
    <div style="width: 100%; display: flex; justify-content: center;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; width: 400px;">
            <div style="text-align: center;">
                <p style="font-size: 36px; font-weight: bold; color: #1f2d3d; margin: 0;">GoEvent</p>
                <p style="font-size: 18px; color: #3b3f44; font-family: arial, helvetica, sans-serif; margin-top: 20px;">
                    Your verification key is:
                </p>
                <div style="background-color: #0b9019; color: #ffffff; font-size: 18px; font-family: arial, helvetica, sans-serif; border-radius: 5px; padding: 10px; margin-top: 10px; display: inline-block;">
                    <strong>${code}</strong>
                </div>
            </div>
        </div>
    </div>
    <p>If you did not create an account, please ignore this email.</p>
`;
    }
    static resetPassword(code) {
        return `
    <p>To reset your password, use the code below:</p>
    <p style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
      ${code}
    </p>
    </p>
    <p>If you did not request a password reset, please ignore this email.</p>
    `;
    }
    static invitation(event, address, date, code, name, invitationId) {
        return `
<div style="background-color: #C2BAA6; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <div style="width: 100%; display: flex; justify-content: center;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; width: 400px;">
            <div style="background-color: #EB9C64; padding: 10px; border-radius: 10px 10px 0 0; text-align: center;">
                <h3 style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 0;">${event}</h3>
            </div>
            <div style="text-align: center; background-color: #C2BAA6; padding: 20px;">
                <h2 style="font-size: 22px; color: #1f2d3d; margin: 5px 0;">Estimado/a ${name},</h2>
                <p style="font-size: 18px; color: #3b3f44;">Nos complace invitarte a participar de ${event}.</p>
                <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Address: ${address}</h2>
                <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Date: ${date}</h2>
                <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Code: ${code}</h2>
                <h2 style="font-size: 12px; color: #3b3f44; margin: 20px 0;">Por favor conserva este correo electrónico con el QR adjunto.</h2>
                <p style="font-size: 18px; color: #3b3f44;">Gracias por usar GoEvent.</p>
                <div style="margin: 20px 0; display: flex; justify-content: center;">
                    <a href="${environment_1.DEPLOY_URL}${environment_1.API_VERSION}/test/update_invitation/${invitationId}/accepted" style="text-decoration: none;">
                        <button style="background-color: #EB9C64; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-right: 10px;">
                            Confirmar invitación
                        </button>
                    </a>
                    <a href="${environment_1.DEPLOY_URL}${environment_1.API_VERSION}/test/update_invitation/${invitationId}/rejected" style="text-decoration: none;">
                        <button style="background-color: #EB9C64; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                            Cancelar participación
                        </button>
                    </a>
                </div>
            </div>
            <div style="background-color: #EB9C64; padding: 10px; border-radius: 0 0 10px 10px; text-align: center;">
                <h3 style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 0;">GoEvent</h3>
            </div>
        </div>
    </div>
</div>
    `;
    }
    static invitationReminder(event, address, date, name, invitationId) {
        return `
<div style="background-color: #C2BAA6; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <div style="width: 100%; display: flex; justify-content: center;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; width: 400px;">
            <div style="background-color: #EB9C64; padding: 10px; border-radius: 10px 10px 0 0; text-align: center;">
                <h3 style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 0;">${event}</h3>
            </div>
            <div style="text-align: center; background-color: #C2BAA6; padding: 20px;">
                <h2 style="font-size: 22px; color: #1f2d3d; margin: 5px 0;">Estimado/a ${name},</h2>
                <p style="font-size: 18px; color: #3b3f44;">Le recordamos que faltan 3 dias para participar de ${event}.</p>
                <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Address: ${address}</h2>
                <h2 style="font-size: 20px; color: #3b3f44; margin: 5px 0;">Date: ${date}</h2>
                <p style="font-size: 18px; color: #3b3f44;">Gracias por usar GoEvent.</p>
                <div style="margin: 20px 0; display: flex; justify-content: center;">
                    <a href="${environment_1.DEPLOY_URL}${environment_1.API_VERSION}/test/update_invitation/${invitationId}/accepted" style="text-decoration: none;">
                        <button style="background-color: #EB9C64; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-right: 10px;">
                            Confirmar invitación
                        </button>
                    </a>
                    <a href="${environment_1.DEPLOY_URL}${environment_1.API_VERSION}/test/update_invitation/${invitationId}/rejected" style="text-decoration: none;">
                        <button style="background-color: #EB9C64; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                            Cancelar participación
                        </button>
                    </a>
                </div>
            </div>
            <div style="background-color: #EB9C64; padding: 10px; border-radius: 0 0 10px 10px; text-align: center;">
                <h3 style="font-size: 24px; font-weight: bold; color: #ffffff; margin: 0;">GoEvent</h3>
            </div>
        </div>
    </div>
</div>
    `;
    }
}
exports.default = EmailTemplates;
