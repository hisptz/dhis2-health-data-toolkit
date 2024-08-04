import React from "react";
import { useParams } from "react-router-dom";
import classes from "./MetadataDetail.module.css";
import { Card, DropdownButton, FlyoutMenu, MenuItem, Button } from "@dhis2/ui";

const metadataDetails = {
    "covid-19": {
        label: "COVID-19",
        title: 'DHIS2 COVID-19 Surveillance toolkit',
        description: "\n\nThe DHIS2 toolkit for COVID-19 was inspired by the Ministry of Health Sri Lanka’s pioneering design of DHIS2 tracker for COVID-19 case detection and draws on years of collaboration with the World Health Organization (WHO) to develop information system standards for case-based disease surveillance. The COVID-19 toolkit includes standard metadata configurations aligned with the WHO’s technical guidance on COVID-19 surveillance and case definitions and implementation guidance to enable rapid deployment in countries.",
        image: "https://dhis2.org/wp-content/uploads/package-Covid.png"
    },
    "community-health": {
        label: "Community Health",
        title: '',
        description: "Community health focuses on the health and well-being of entire communities. It involves a variety of strategies and services aimed at improving health outcomes, including preventive care, health education, and community-based interventions. Key areas include maternal and child health, infectious disease prevention, and chronic disease management.",
        image: "/images/community-health.jpg"
    },
    "covid-19-vaccination": {
        label: "COVID-19 Vaccination",
        title: '',
        description: "COVID-19 vaccination involves administering vaccines that protect against the SARS-CoV-2 virus. Vaccines have been shown to be highly effective in preventing severe illness, hospitalization, and death. Vaccination campaigns are critical to controlling the spread of the virus and achieving herd immunity.",
        image: "/images/covid-19-vaccination.jpg"
    },
    "entomology-vector-control": {
        label: "Entomology and Vector Control",
        title: '',
        description: "Entomology and vector control involve studying insects and other vectors that transmit diseases, such as mosquitoes that spread malaria. Strategies for vector control include using insecticides, eliminating breeding sites, and implementing biological controls. Effective vector control is essential for preventing the spread of vector-borne diseases.",
        image: "/images/entomology-vector-control.jpg"
    },
    "rmncah": {
        label: "RMNCAH",
        title: '',
        description: "Reproductive, Maternal, Newborn, Child, and Adolescent Health (RMNCAH) focuses on improving health outcomes for these groups. Key areas include prenatal care, safe childbirth, immunization, nutrition, and adolescent health services. RMNCAH programs aim to reduce mortality and morbidity through comprehensive healthcare services.",
        image: "/images/rmncah.jpg"
    },
    "common-metadata-library": {
        label: "Common Metadata Library",
        title: '',
        description: "The Common Metadata Library provides a collection of standardized metadata elements that can be used across various health information systems. This library includes data elements, indicators, and datasets that support health monitoring, reporting, and analysis. It facilitates data interoperability and consistency in health information systems.",
        image: "/images/common-metadata-library.jpg"
    }
};

const MetadataDetail: React.FC = () => {
    const { category } = useParams<{ category: string }>();

    if (!category || !(category in metadataDetails)) {
        return <div>Metadata not found</div>;
    }

    const metadata = metadataDetails[category as keyof typeof metadataDetails];

    return (
        <div className={classes.container} style={{ width: '900px', height: '400px'  }}>
            <h1>{metadata.label}</h1>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p style={{ paddingRight: "4rem", fontWeight: '700', fontSize: '1.5rem'}}>{metadata.title}</p>
                    <p style={{ paddingRight: "4rem"}}>{metadata.description}</p>
                 </div>
            <img src={metadata.image} alt={metadata.label} style={{ width: "200px", height: "200px", objectFit: 'cover'  }} className={classes.image} />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '70px' }}>
            <Button style={{marginRight:'5px'}}>More Details</Button>
            <Button primary>Import</Button>
            </div>
            
        </div>
    );
};

export default MetadataDetail;
