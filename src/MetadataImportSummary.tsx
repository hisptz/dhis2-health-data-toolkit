import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Card } from "@dhis2/ui";

const MetadataImportSummary: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const summaryData = location.state?.summaryData || [];

    return (
        <Card>
            <h2>Metadata Import Summary</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Object Name</TableCell>
                        <TableCell>UID</TableCell>
                        <TableCell>Existing in Database</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {summaryData.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{item.objectName}</TableCell>
                            <TableCell>{item.uid}</TableCell>
                            <TableCell>{item.existingInDatabase}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
        </Card>
    );
};

export default MetadataImportSummary;
