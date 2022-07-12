import { Handler } from "aws-lambda";

export const hello: Handler = (_event: any) => {
    const now = new Date();
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(
            {
                name: "aPomodoro",
                status: {
                    name: "pomodoro",
                    endTime: now.setMinutes(now.getMinutes() + 25),
                },
                participants: ["fran", "ronny"],
            },
            null,
            2
        ),
    };
    return new Promise((resolve) => resolve(response));
};
