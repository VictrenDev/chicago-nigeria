"use client";

import { useState } from "react";
import Feed from "../../pages/feed";
import Badge from "./badge";
import Marketplace from "../../pages/marketplace";
// import Events from "./events";
import { Bell, Calendar, Home, MessageCircle, Settings, ShoppingBag, Users } from "lucide-react";
import MobileNavigation from "./mobilenav";

export default function SideNavigation() {
    const [page, setPage] = useState("marketplace");
    
    
    const switchPage = () => {
        switch (page) {
            case "feed":
             
                return <Feed />;
            case "marketplace":
             
                return <Marketplace />;
            // case "events":
                
            //     return <Events />;
            default:
                return <div className="flex justify-center items-center md:min-h-screen"><h1 className="text-5xl text-gray-800 font-bold">Page under construction</h1></div>;
        }
    };

    return (
        <main className="container-custom grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-12 py-12 bg-gray-50">
            <section className="sticky top-0 h-screen pt-4 md:block hidden">
                <div className="space-y-8 w-full">
                    <aside className="space-y-0.5 bg-white p-4 rounded-lg sidebar-buttons">
                        <button
                            onClick={() => {
                                setPage("feed");
                            }} className={page === "feed" ? "activeSideNav" : ""}>
                            <Home className="w-4 h-4" />
                            <span>Feeds</span>
                        </button>
                        <button
                            onClick={() => {
                                setPage("events");
                            }}  className={page === "events" ? "activeSideNav" : ""}>
                            <Calendar className="w-4 h-4" />

                            <span>Events</span>
                        </button>
                        <button
                            onClick={() => {
                                setPage("marketplace");
                            }}  className={page === "marketplace" ? "activeSideNav" : ""}>
                            <ShoppingBag className="w-4 h-4" />

                            <span>Marketplace</span>
                        </button>
                        <button
                            onClick={() => {
                                setPage("something else");
                            }}  className={page === "feed" ? "messages" : ""}>
                              <MessageCircle className="w-4 h-4" />

                            <span>Messages</span>
                            <Badge value={2} />
                        </button>
                        <button
                            onClick={() => {
                                setPage("something else");
                            }}  className={page === "groups" ? "activeSideNav" : ""}>
                            <Users className="w-4 h-4" />

                            <span>Groups</span>
                        </button>
                        <button
                            onClick={() => {
                                setPage("something else");
                            }}  className={page === "notifications" ? "activeSideNav" : ""}>
                            <Bell className="w-4 h-4" />

                            <span>Notifications</span>
                            <Badge value={12} />
                        </button>
                        <button
                            onClick={() => {
                                setPage("something else");
                            }}  className={page === "Settings" ? "activeSideNav" : ""}>
                            <Settings className="w-4 h-4" />

                            <span>Settings</span>
                        </button>
                    </aside>
                    <div className=" bg-white p-4 rounded-lg space-y-4">
                        <h2>Trending Now</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-sm">Nigeria at 65 Celebration</h3>
                                <p className="text-xs text-gray-400 font-light">234 discussing</p>
                            </div>
                            <div>
                                <h3 className="text-sm">Chicago Tech Jobs</h3>
                                <p className="text-xs text-gray-400 font-light">234 discussing</p>
                            </div>
                            <div>
                                <h3 className="text-sm">Nigerian Business Network</h3>
                                <p className="text-xs text-gray-400 font-light">234 discussing</p>
                            </div>
                            <div>
                                <h3 className="text-sm">Cultural Heritage Month</h3>
                                <p className="text-xs text-gray-400 font-light">234 discussing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-50">{switchPage()}</section>
             <MobileNavigation currentPage={page} onPageChange={setPage} />
        </main>
    );
}
