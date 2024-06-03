import React from "react";
import i18n from "@dhis2/d2-i18n";
import classes from "./App.module.css";
import { useDataQuery } from "@dhis2/app-runtime";

const query = {
	me: {
		resource: "me"
	}
};


interface QueryResponse {
	me: {
		name: string;
	};
}

const MyApp = () => {
	const { error, data, loading } = useDataQuery<QueryResponse>(query);
	if (error) return <span>ERROR</span>;
	if (loading) return <span>...</span>;

	const name = data?.me.name;

	return (
		<div className={classes.container}>
			<>
				<h1>
					{i18n.t("Hello {{name}}", { name })}
				</h1>
				<h3>{i18n.t("Welcome to DHIS2!")}</h3>
			</>
		</div>
	);
};

export default MyApp;
