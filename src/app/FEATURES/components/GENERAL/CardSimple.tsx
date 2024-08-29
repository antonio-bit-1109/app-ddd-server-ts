import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { IUser } from "../../../../interfaces/interfaces";
import { useState } from "react";

interface IProps {
    data: IUser;
}

export function CardSimple({ data }: IProps) {
    const [CTAButton] = useState(["Modifica Informazioni utente"]);

    const IsActiveUser = (active: boolean) => {
        switch (active) {
            case true:
                return "UTENTE ATTIVO";
            case false:
                return "UTENTE INATTIVO";

            default:
                return "NA";
        }
    };

    return (
        <Card className="mt-6 w-96 mx-6">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {data.Nome} - {data.Cognome}
                </Typography>
                <Typography>{data.Email}</Typography>
                <Typography
                    className={`my-2 size-4 ${
                        data.IsActive
                            ? "text-phosphorescent text-phosphorescentGreen"
                            : "text-phosphorescent text-phosphorescentRed"
                    }`}
                >
                    {IsActiveUser(data.IsActive)}
                </Typography>
            </CardBody>
            <CardFooter className="pt-3">
                <Button>{CTAButton[0]}</Button>
            </CardFooter>
        </Card>
    );
}
