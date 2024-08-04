import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./App.module.css";

import {
    Card,
    DropdownButton,
    FlyoutMenu,
    MenuItem,
    Button,
    LinearLoader,
} from "@dhis2/ui";

interface MetadataDetail {
    label: string;
    title: string;
    description: string;
    image: string;
    downloadUrl: string;
}

const metadataDetails: { [key: string]: MetadataDetail } = {
    "covid-19": {
        label: "COVID-19",
        title: 'DHIS2 COVID-19 Surveillance toolkit',
        description: "The DHIS2 toolkit for COVID-19 was inspired by the Ministry of Health Sri Lanka’s pioneering design of DHIS2 tracker for COVID-19 case detection and draws on years of collaboration with the World Health Organization (WHO) to develop information system standards for case-based disease surveillance. The COVID-19 toolkit includes standard metadata configurations aligned with the WHO’s technical guidance on COVID-19 surveillance and case definitions and implementation guidance to enable rapid deployment in countries.",
        image: "https://dhis2.org/wp-content/uploads/package-Covid.png",
        downloadUrl: "https://example.com/covid19_metadata.zip"
    },
    "community-health": {
        label: "Community Health",
        title: 'Community health Information System (CHIS)',
        description: "The CHIS toolkit for DHIS2 was developed with UNICEF and WHO to accompany the WHO Analysis and Use of Community Data: Guidance for community health service monitoring. Tools and guidance are designed to enhance community-based health programs, to monitor their impact, and to make evidence-based policy adjustments according to the real needs of the targeted communities. As the types of services that community health workers provide in communities are highly heterogeneous across countries, we provide a modular approach for countries to select indicators as relevant to national monitoring frameworks and integrate community-based health service data into the national system. CHIS dashboards and indicators are harmonized with related health facility data indicators in programme-specific HMIS modules to increase visibility, access, analysis and use of these data for health program planning. In addition, a practical implementation guide is available for national and local-decision makers involved in the design, planning, deployment, governance and scale up of successful DHIS2-based CHIS.",
        image: "https://dhis2.org/wp-content/uploads/package-community-health.png",
        downloadUrl: "https://example.com/community_health_metadata.zip"
    },
    "covid-19-vaccination": {
        label: "COVID-19 Vaccination",
        title: 'DHIS2 COVID-19 Vaccine Delivery Toolkit',
        description: "The DHIS2 toolkit for COVID-19 vaccine delivery expands field-tested designs and tools from the WHO DHIS2 immunization data toolkit to enable countries to rapidly update existing systems to support the equitable delivery of lifesaving COVID-19 vaccines at scale. Our focus is on integrating digital solutions for COVID-19 vaccine delivery into national DHIS2-based immunization systems and strengthening these systems for sustainable impact across all aspects of vaccine preventable disease interventions. DHIS2 is well-established as a health information management system for both immunization programs and COVID-19 response: More than 45 countries already use DHIS2 as the information backbone of their national immunization programs, including 30 that have installed modules from the WHO DHIS2 Immunization Toolkit, and 36 countries rapidly deployed DHIS2 for COVID-19 surveillance. Several countries have already deployed DHIS2 for COVID-19 vaccine delivery, including Sri Lanka, Laos, Rwanda and Mozambique.",
        image: "https://dhis2.org/wp-content/uploads/package-CovidVaccine.png",
        downloadUrl: "https://example.com/covid19_vaccination_metadata.zip"
    },
    "entomology-vector-control": {
        label: "Entomology and Vector Control",
        title: 'Entomology and Vector Control',
        description: "The DHIS2 modules for Entomology and Vector Control have been developed to support countries to improve the collection and use of entomological and vector control intervention data to inform programmatic decisions. Data and work flows vary greatly among the various entomological activities, methods and procedures. The modular approach to the toolkit allows countries to choose which modules to implement depending on programme needs. These modules have been designed with the WHO Global Malaria Programme and the WHO Neglected Tropical Diseases department to align with WHO global recommendations, standard procedures and guidance. Incorporating entomology and vector control data into national health information systems alongside surveillance, stock and service delivery data can improve the triangulation of programme information for better intervention planning. The Entomology & Vector Control Design Guide describes the overall conceptual design of the modules for integrating entomology and vector control data into DHIS2.",
        image: "https://dhis2.org/wp-content/uploads/package-entomology.png",
        downloadUrl: "https://example.com/entomology_vector_control_metadata.zip"
    },
    "rmncah": {
        label: "RMNCAH",
        title: 'Reproductive, maternal, neonatal, child & adolescent health',
        description: "Based on WHO guidelines for the analysis and use of health facility data for RMNCAH programme managers, a collection of DHIS2 resources and metadata are available to facilitate the integration of routine facility data into a national HMIS for monitoring reproductive, maternal, neonatal, child and adolescent health.",
        image: "https://dhis2.org/wp-content/uploads/package-RMNCAH.png",
        downloadUrl: "https://example.com/rmncah_metadata.zip"
    },
    "common-metadata-library": {
        label: "Common Metadata Library",
        title: 'Common Metadata Library for HIS',
        description: "One key advantage of DHIS2 is that it can be used for multiple health programs, within a single, harmonized instance. There are several practical reasons to share metadata across health programs and case-based trackers or electronic registries: to reduce duplication of data entry and improve data flows, to share metadata and data between programs for improved analyses, and to facilitate maintenance of metadata in the system. Common HIS metadata includes core concepts like indicator types, reusable data elements for population data, as well as a set of common Tracker metadata to re-use across case surveillance and person-centered monitoring tracker programs.",
        image: "https://dhis2.org/wp-content/uploads/package-common-metadata.png",
        downloadUrl: "https://example.com/common_metadata_library.zip"
    }
};

const HomePage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showMetadataType, setShowMetadataType] = useState<boolean>(false);
    const [selectedMetadataType, setSelectedMetadataType] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSelectCategory = (value: string) => {
        setSelectedCategory(value);
        setShowMetadataType(false);
        setSelectedMetadataType(null);
        setIsDropdownOpen(false); // Close the dropdown menu
        console.log(`Selected category: ${value}`);
    };

    const handleImportClick = () => {
        setShowMetadataType(true);
    };

    const handleBackClick = () => {
        setShowMetadataType(false);
        setSelectedMetadataType(null);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown menu
    };

    const handleImport = () => {
        if (selectedMetadataType === "dashboard" || selectedMetadataType === "aggregate") {
            setIsLoading(true); // Start the loader

            setTimeout(() => {
                const summaryData = [
                    {
                        objectName: "Category",
                        uid: "GLevLNI9wk2",
                        api: "api/categories.json?filter=name:eq:default",
                    },
                    {
                        objectName: "Category option",
                        uid: "xYerKDKCefk",
                        api: "api/categoryOptions.json?filter=name:eq:default",
                    },
                    {
                        objectName: "Category combination",
                        uid: "bjDvmb4bfuf",
                        api: "api/categoryCombos.json?filter=name:eq:default",
                    },
                    {
                        objectName: "Category option combination",
                        uid: "HllvX50cXC0",
                        api: "api/categoryOptionCombos.json?filter=name:eq:default",
                    },
                    {
                        objectName: "Numerator only (number)",
                        uid: "kHy61PbChXr",
                        api: "api/indicatorTypes.json?filter=number:eq:true&filter=factor:eq:1",
                    },
                    {
                        objectName: "Percentage",
                        uid: "hmSnCXmLYwt",
                        api: "api/indicatorTypes.json?filter=number:eq:false&filter=factor:eq:100",
                    },
                ];

                setIsLoading(false); // Stop the loader

                navigate("/summary", {
                    state: { summaryData },
                });
            }, 90000); // Simulate a delay of 90 seconds (1.5 minutes)
        }
    };

    const selectedMetadata = selectedCategory ? metadataDetails[selectedCategory] : null;

    return (
        <div className={classes.container}>
            <h1>METADATA IMPORT</h1>
            <p>
                Here you can select and download metadata packages curated by HISP UiO as resources for your DHIS2 implementation. <br />
                Metadata downloads contain pre-configured DHIS2 metadata such as data elements and indicators. <br />
                The editable files can be imported into a new or existing DHIS2 instance with compatible versioning.
            </p>
            <div className={classes.dropdownContainer}>
                <p>Select by area</p>
                <DropdownButton
                    onClick={toggleDropdown}
                    open={isDropdownOpen}
                    className={classes.fixedWidthDropdown}
                    component={
                        <FlyoutMenu className={classes.fixedWidthDropdownMenu}>
                            {Object.keys(metadataDetails).map((key) => (
                                <MenuItem
                                    key={key}
                                    label={metadataDetails[key].label}
                                    onClick={() => handleSelectCategory(key)}
                                />
                            ))}
                        </FlyoutMenu>
                    }
                >
                    <div className={classes.dropdownButton}>
                        {selectedCategory ? metadataDetails[selectedCategory].label : "Choose Metadata Category"}
                    </div>
                </DropdownButton>
            </div>
            <Card className={classes.container}>
                {isLoading ? (
                    <div className={classes.loaderContainer}>
                        <LinearLoader amount={0} />
                        <p>Loading, please wait...</p>
                    </div>
                ) : (
                    <>
                        {!showMetadataType && selectedMetadata && (
                            <div>
                                <div className={classes.metadataDetails}>
                                    <div className={classes.metadataText}>
                                        <h2>{selectedMetadata.title || selectedMetadata.label}</h2>
                                        <p>{selectedMetadata.description}</p>
                                    </div>
                                    <img src={selectedMetadata.image} alt={selectedMetadata.label} className={classes.metadataImage} />
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '70px' }}>
                                    <Button style={{ marginRight: '5px' }}>More Details</Button>
                                    <Button primary onClick={handleImportClick}>Import</Button>
                                </div>
                            </div>
                        )}
                        {showMetadataType && (
                            <div>
                                <p>Select Metadata type (Dashboard, tracker/aggregate) to be installed</p>
                                <div className={classes.customRadio}>
                                    <input
                                        type="radio"
                                        id="dashboard"
                                        name="metadataType"
                                        value="dashboard"
                                        onChange={() => setSelectedMetadataType("dashboard")}
                                    />
                                    <label htmlFor="dashboard">Dashboard</label>
                                </div>
                                <div className={classes.customRadio}>
                                    <input
                                        type="radio"
                                        id="aggregate"
                                        name="metadataType"
                                        value="aggregate"
                                        onChange={() => setSelectedMetadataType("aggregate")}
                                    />
                                    <label htmlFor="aggregate">Aggregate/Tracker</label>
                                </div>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '70px' }}>
                                    <Button onClick={handleBackClick}>Back</Button>
                                    {selectedMetadataType && <Button primary onClick={handleImport}>Import</Button>}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};

export default HomePage;
