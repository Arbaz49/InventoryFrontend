import React, { useEffect, useState } from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//table


const HomeDashboard = () => {
    return (
        <div style={{ paddingTop: "3%" }}>

            <div className="" style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
                <div className="products" style={{ display: "flex", height: "100px", width: "33%", border: "1px solid black",borderRadius:"12px" }}>
                    <div style={{ width: "40%" }}>
                        <ShoppingCartIcon style={{ width: "100%", height: "90%" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h5" >
                            Products
                        </Typography>
                        <Typography variant="h5"  >
                            99
                        </Typography>
                    </div>

                </div>
                <div className="products" style={{ display: "flex", height: "100px", width: "33%", border: "1px solid black",borderRadius:"12px" }}>
                    <div style={{ width: "40%" }}>
                        <PeopleAltIcon style={{ width: "100%", height: "90%" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h5" >
                            Users
                        </Typography>
                        <Typography variant="h5"  >
                            99
                        </Typography>
                    </div>

                </div><div className="products" style={{ display: "flex", height: "100px", width: "33%", border: "1px solid black",borderRadius:"12px"  }}>
                   <div style={{ width: "40%" }}>
                        <LocalShippingIcon style={{ width: "100%", height: "90%" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h5" >
                            Suppliers
                        </Typography>
                        <Typography variant="h5"  >
                            99
                        </Typography>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;
