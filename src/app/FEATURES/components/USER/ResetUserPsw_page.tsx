import { Card, Input, Typography } from "@material-tailwind/react";

export function ResetUserPsw_page() {
    return (
        <Card className="w-screen h-screen flex justify-center items-center" color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Reset Password
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography> */}
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Vecchia Password
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        crossOrigin={undefined}
                    /> */}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Nuova Password
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="inserisci la tua nuova password"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        crossOrigin={undefined}
                    />
                    {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Password
                    </Typography>
                    <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} crossOrigin={undefined}                    /> */}
                </div>
                {/* <Checkbox
                    label={
                        <Typography variant="small" color="gray" className="flex items-center font-normal">
                            I agree the
                            <a href="#" className="font-medium transition-colors hover:text-gray-900">
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    crossOrigin={undefined}
                />
                <Button className="mt-6" fullWidth>
                    sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-gray-900">
                        Sign In
                    </a>
                </Typography> */}
            </form>
        </Card>
    );
}
