import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { FaUserAlt } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { LuBookCopy } from "react-icons/lu";
export function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Card className="h-[calc(100vh-64px)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Pannello di controllo
                </Typography>
            </div>
            <List>
                <ListItem
                    onClick={() => {
                        navigate("/Admin");
                    }}
                >
                    <ListItemPrefix>
                        <FaUserAlt className="h-5 w-5" />
                    </ListItemPrefix>
                    Utenti
                </ListItem>
                <ListItem
                    onClick={() => {
                        navigate("/Admin/Books");
                    }}
                >
                    <ListItemPrefix>
                        <PiBooksFill className="h-5 w-5" />
                    </ListItemPrefix>
                    Libri
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                        <Chip value="**" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>

                {location.pathname.startsWith("/Admin/Books") && (
                    <div
                        onClick={() => {
                            navigate("/Admin/Books/CreateBook");
                        }}
                        className="mt-28"
                    >
                        <ListItem>
                            <ListItemPrefix>
                                <LuBookCopy className="color" size={20} />
                            </ListItemPrefix>
                            Aggiungi nuovo libro
                        </ListItem>
                    </div>
                )}

                {/* <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Profile
                </ListItem> */}
                {/* <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem> */}
                {/* <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem> */}
            </List>
        </Card>
    );
}
