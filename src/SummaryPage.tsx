import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./App.module.css";
import { Card, Table, TableHead, TableBody, TableRow, TableCell, Button, CircularLoader, AlertBar } from "@dhis2/ui";
import { useDataMutation } from "@dhis2/app-runtime";

const mutation: any = {
    type: "create",
    resource: "metadata",
    params: {
        importMode: "VALIDATE",
        async: false,
        atomicMode: "ALL",
    },
    data: ({ data }: any) => data,
};

const SummaryPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const summaryData = (location.state as any)?.summaryData || [];
    const [mutate, { error }] = useDataMutation(mutation);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const getButtonColor = (uid: string, existingInDb: string) => {
        return uid === existingInDb ? "success" : "destructive";
    };

    const getButtonLabel = (uid: string, existingInDb: string) => {
        return uid === existingInDb ? "Up to Date" : "Update";
    };

    const handleUpdateClick = async () => {
        setLoading(true);
        try {
            await mutate({ data: summaryData });
            setTimeout(() => {
                setLoading(false);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000); // Hide after 5 seconds
            }, 30000); // Simulate a delay of 30 seconds
        } catch (err) {
            console.error("Error updating metadata:", err);
            setLoading(false);
            alert("Error updating metadata. Please try again.");
        }
    };

    // Check if all UIDs are up to date
    const allUidsMatch = summaryData.every((item: any) => item.uid === (item.uid !== "Error" ? item.uid : "N/A"));

    return (
        <div className={classes.container}>
            <Card className={classes.importSummary}>
                <div className={classes.tableContainer}>
                    <h2>Metadata Import Summary</h2>
                    <p>
                        Below is the summary of the metadata import process. The table shows the object names, UIDs, 
                        existing UIDs in the database, and actions required. Update the metadata if necessary.
                    </p>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeader}>Object Name</TableCell>
                                <TableCell className={classes.tableHeader}>UID</TableCell>
                                <TableCell className={classes.tableHeader}>Existing in the Database</TableCell>
                                <TableCell className={classes.tableHeader}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {summaryData.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{item.objectName}</TableCell>
                                    <TableCell>{item.uid}</TableCell>
                                    <TableCell>{item.uid !== "Error" ? item.uid : "N/A"}</TableCell>
                                    <TableCell>
                                        <Button
                                            className={classes.updateButton}
                                            color={getButtonColor(item.uid, item.uid !== "Error" ? item.uid : "N/A")}
                                        >
                                            {getButtonLabel(item.uid, item.uid !== "Error" ? item.uid : "N/A")}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className={classes.updateButtonContainerOutside}>
                    {loading ? (
                        <CircularLoader />
                    ) : (
                        <Button
                            className={classes.updateButton}
                            primary
                            onClick={handleUpdateClick}
                            disabled={!allUidsMatch}
                        >
                            Update Metadata
                        </Button>
                    )}
                    {error && <p className={classes.error}>Error updating metadata: {error.message}</p>}
                </div>
            </Card>
            {showSuccess && (
                <div className={classes.alertBarContainer}>
                    <AlertBar duration={5000} success>
                        Metadata updated successfully!
                    </AlertBar>
                </div>
            )}
        </div>
    );
};

export default SummaryPage;
