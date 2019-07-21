import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import * as PdfStyles from './PdfStyles';

export const LabelAndValue = ({ label, value }) => (
    <View style={PdfStyles.labelValueStyles.itemRow}>
        <Text style={PdfStyles.labelValueStyles.itemLabel}>{label}</Text>
        <Text style={PdfStyles.labelValueStyles.itemDivider}>:  </Text>
        <Text style={PdfStyles.labelValueStyles.itemContent}>{value}</Text>
    </View>
);


export const PaRow = ({ paRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'stretch', width: '100%', }}>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2 }}>{paRow.pendingAwardTitle}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{paRow.pendingAwardExpDate}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right', }}>{paRow.pendingAwardRevenueValue}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardCTOValue}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardFYEPrevRev}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardFYEPrevCTO}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardCurBacklogRev}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardCurBacklogCTO}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardFutureBacklogRev}</Text>
        <Text style={{ width: '8%', fontSize: 10, backgroundColor: cellBackground, color: color, padding: 2, textAlign: 'right' }}>{paRow.pendingAwardFutureBacklogCTO}</Text>

    </View>
);

//______________________________Revenue Row Started__________________________
export const RevenueRowMainHeader = ({ revenueRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'stretch', width: '100%', }}>
        <Text style={{ width: '10%', fontSize: 12, backgroundColor: 'white', color: color, textAlign: 'left', marginLeft: '0px' }}>{revenueRow.revenueAwardTitle}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenueAwardExpDate}</Text>
        <Text style={{ width: '25%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenueAwardRevenueValue}</Text>
        <Text style={{ width: '25%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenueAwardCTOValue}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenueAwardFYEPrevRev}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenueAwardFYEPrevCTO}</Text>
    </View>
);

export const RevenueRow = ({ revenueRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'stretch', width: '100%', }}>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{revenueRow.revenueTitle}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenue_B_Begining}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenue_ag_YTD}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{revenueRow.revenue_ag_BOY}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{revenueRow.revenue_ag_Total}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'right', marginLeft: '18px' }}>{revenueRow.revenue_ca_YTD}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'right' }}>{revenueRow.revenue_ca_BOY}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{revenueRow.revenue_ca_Total}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenue_b_Ending}</Text>
        <Text style={{ width: '7.5%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{revenueRow.revenue_ny_awards}</Text>
        <Text style={{ width: '7.5%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{revenueRow.revenue_ny_Activity}</Text>

    </View>
);
//______________________________Revenue Row End___________________________

// _____________________________CTO Row Start______________________________
export const CTORowMainHeader = ({ ctoRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'stretch', width: '100%', }}>
        <Text style={{ width: '10%', fontSize: 12, backgroundColor: 'white', color: color, textAlign: 'left', marginLeft: '0px' }}>{ctoRow.ctoTitle_col1}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.ctoTitle_col2}</Text>
        <Text style={{ width: '25%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.ctoTitle_col3}</Text>
        <Text style={{ width: '25%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.ctoTitle_col4}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.ctoTitle_col5}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.ctoTitle_col6}</Text>
    </View>
);

export const CTORow = ({ ctoRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'stretch', width: '100%', }}>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{ctoRow.ctoTitle}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.cto_B_Begining}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.cto_ag_YTD}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{ctoRow.cto_ag_BOY}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{ctoRow.cto_ag_Total}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'right', marginLeft: '18px' }}>{ctoRow.cto_ca_YTD}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'right' }}>{ctoRow.cto_ca_BOY}</Text>
        <Text style={{ width: '8.33%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{ctoRow.cto_ca_Total}</Text>
        <Text style={{ width: '10%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.cto_b_Ending}</Text>
        <Text style={{ width: '7.5%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{ctoRow.cto_ny_awards}</Text>
        <Text style={{ width: '7.5%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{ctoRow.cto_ny_Activity}</Text>

    </View>
);
// _____________________________CTO Row End_________________________________

//______________________________Adjustment to Gross Profit__________________________

export const ATGPRow = ({ atgpRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', width: '100%', marginBottom: 5, }}>
        <Text style={{ width: '20%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', }}>{atgpRow.atgpTitle}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{atgpRow.atgp_YTD}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{atgpRow.atgp_BOY}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{atgpRow.atgp_Total}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{atgpRow.atgp_NextYear}</Text>

    </View>
);
//______________________________Adjustment to Gross Profit__________________________

//______________________________Adjusted Gross Profit________________________________

export const AGPRow = ({ agpRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', width: '100%', marginBottom: 5, }}>
        <Text style={{ width: '20%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{agpRow.agpTitle}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{agpRow.agp_YTD}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{agpRow.agp_BOY}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{agpRow.agp_Total}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{agpRow.agp_NextYear}</Text>

    </View>
);

//______________________________Adjusted Gross Profit________________________________


//_________________________________G&A  start________________________________________

export const GARow = ({ gaRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', width: '100%', marginBottom: 5, }}>
        <Text style={{ width: '20%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{gaRow.gaTitle}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{gaRow.ga_YTD}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{gaRow.ga_BOY}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{gaRow.ga_Total}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{gaRow.ga_NextYear}</Text>

    </View>
);

//_________________________________G&A End___________________________________________

//Other Expense Start
export const OERow = ({ oeRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', width: '100%', marginBottom: 5, }}>
        <Text style={{ width: '20%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{oeRow.oeTitle}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{oeRow.oe_YTD}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{oeRow.oe_BOY}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{oeRow.oe_Total}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{oeRow.oe_NextYear}</Text>

    </View>
);
//Other Expense End

//Net Income Start
export const NERow = ({ neRow, cellBackground, color }) => (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', width: '100%', marginBottom: 5, }}>
        <Text style={{ width: '20%', fontSize: 10, backgroundColor: cellBackground, color: color, }}>{neRow.neTitle}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{neRow.ne_YTD}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{neRow.ne_BOY}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center' }}>{neRow.ne_Total}</Text>
        <Text style={{ width: '15%', fontSize: 10, backgroundColor: cellBackground, color: color, textAlign: 'center', marginLeft: '18px' }}>{neRow.ne_NextYear}</Text>

    </View>
);
//Net Income End

class MyDocument extends React.Component {


    render() {
       

        // ________________________________content for the Revenue start___________________________________
        let revenueMainHeaderTitle =
        {
            revenueAwardTitle: '',
            revenueAwardExpDate: 'Backlog',
            revenueAwardRevenueValue: 'Awards/Growth',
            revenueAwardCTOValue: 'Contract Activity',
            revenueAwardFYEPrevRev: 'Backlog',
            revenueAwardFYEPrevCTO: 'Next Year'
        }

        let revenueTitle = {
            revenueTitle: '',
            revenue_B_Begining: 'Beginning',
            revenue_ag_YTD: 'Year-to-Date',
            revenue_ag_BOY: 'Balance of Year',
            revenue_ag_Total: 'Total',
            revenue_ca_YTD: 'Year-To-Date',
            revenue_ca_BOY: 'Balance of Year',
            revenue_ca_Total: 'Total',
            revenue_b_Ending: 'Ending',
            revenue_ny_awards: 'Awards/Growth',
            revenue_ny_Activity: 'Activity',
        }

        let revenueRows = [];
        let revenueRow1 = {
            revenueTitle: 'Contract Awarded in Prior Years',
            revenue_B_Begining: '812618',
            revenue_ag_YTD: '0',
            revenue_ag_BOY: '213671',
            revenue_ag_Total: '213671',
            revenue_ca_YTD: '654654',
            revenue_ca_BOY: '654654',
            revenue_ca_Total: '125555',
            revenue_b_Ending: '371635',
            revenue_ny_awards: '112',
            revenue_ny_Activity: '0',
        }
        let revenueRow2 = {
            revenueTitle: 'Contract Awarded YTD',
            revenue_B_Begining: '0',
            revenue_ag_YTD: '71486',
            revenue_ag_BOY: '0',
            revenue_ag_Total: '71486',
            revenue_ca_YTD: '654654',
            revenue_ca_BOY: '654654',
            revenue_ca_Total: '125555',
            revenue_b_Ending: '371635',
            revenue_ny_awards: '112',
            revenue_ny_Activity: '0',
        }
        let revenueRow3 = {
            revenueTitle: 'Pending Awards',
            revenue_B_Begining: '0',
            revenue_ag_YTD: '71486',
            revenue_ag_BOY: '0',
            revenue_ag_Total: '71486',
            revenue_ca_YTD: '654654',
            revenue_ca_BOY: '654654',
            revenue_ca_Total: '125555',
            revenue_b_Ending: '371635',
            revenue_ny_awards: '112',
            revenue_ny_Activity: '0',
        }
        let revenueRow4 = {
            revenueTitle: 'Other Future Work',
            revenue_B_Begining: '0',
            revenue_ag_YTD: '71486',
            revenue_ag_BOY: '0',
            revenue_ag_Total: '71486',
            revenue_ca_YTD: '654654',
            revenue_ca_BOY: '654654',
            revenue_ca_Total: '125555',
            revenue_b_Ending: '371635',
            revenue_ny_awards: '112',
            revenue_ny_Activity: '0',
        }
        let revenueRow5 = {
            revenueTitle: '2019 Plan',
            revenue_B_Begining: '0',
            revenue_ag_YTD: '71486',
            revenue_ag_BOY: '0',
            revenue_ag_Total: '71486',
            revenue_ca_YTD: '654654',
            revenue_ca_BOY: '654654',
            revenue_ca_Total: '125555',
            revenue_b_Ending: '371635',

        }
        let revenueTotal = {
            revenueTitle: 'Total',
            revenue_B_Begining: 0,
            revenue_ag_YTD: 0,
            revenue_ag_BOY: 0,
            revenue_ag_Total: 0,
            revenue_ca_YTD: 0,
            revenue_ca_BOY: 0,
            revenue_ca_Total: 0,
            revenue_b_Ending: 0,
            revenue_ny_awards: 0,
            revenue_ny_Activity: 0,
        }

        revenueRows.push(revenueRow1);
        revenueRows.push(revenueRow2);
        revenueRows.push(revenueRow3);
        revenueRows.push(revenueRow4);


        revenueRows.forEach(function (data, index) {
            revenueTotal.revenue_B_Begining +=
                +data.revenue_B_Begining || 0;
            revenueTotal.revenue_ag_YTD +=
                +data.revenue_ag_YTD || 0;
            revenueTotal.revenue_ag_BOY +=
                +data.revenue_ag_BOY || 0;
            revenueTotal.revenue_ag_Total +=
                +data.revenue_ag_Total || 0;
            revenueTotal.revenue_ca_YTD +=
                +data.revenue_ca_YTD || 0;
            revenueTotal.revenue_ca_BOY +=
                +data.revenue_ca_BOY || 0;
            revenueTotal.revenue_ca_Total +=
                +data.revenue_ca_Total || 0;
            revenueTotal.revenue_b_Ending +=
                +data.revenue_b_Ending || 0;
            revenueTotal.revenue_ny_awards +=
                +data.revenue_ny_awards || 0;
            revenueTotal.revenue_B_Begining +=
                +data.revenue_ny_Activity || 0;

        })
        // ________________________content for the Revenue End_____________________

        // ______________________content for CTO Start__________________________
        let ctoMainHeaderTitle =
        {
            ctoTitle_col1: '',
            ctoTitle_col2: 'Backlog',
            ctoTitle_col3: 'Awards/Growth',
            ctoTitle_col4: 'Contract Activity',
            ctoTitle_col5: 'Backlog',
            ctoTitle_col6: 'Next Year'
        }

        let ctoTitle = {
            ctoTitle: '',
            cto_B_Begining: 'Beginning',
            cto_ag_YTD: 'Year-to-Date',
            cto_ag_BOY: 'Balance of Year',
            cto_ag_Total: 'Total',
            cto_ca_YTD: 'Year-To-Date',
            cto_ca_BOY: 'Balance of Year',
            cto_ca_Total: 'Total',
            cto_b_Ending: 'Ending',
            cto_ny_awards: 'Awards/Growth',
            cto_ny_Activity: 'Activity',
        }

        let ctoRows = [];
        let ctoRow1 = {
            ctoTitle: 'Contract Awarded in Prior Years',
            cto_B_Begining: '812618',
            cto_ag_YTD: '0',
            cto_ag_BOY: '213671',
            cto_ag_Total: '213671',
            cto_ca_YTD: '654654',
            cto_ca_BOY: '654654',
            cto_ca_Total: '125555',
            cto_b_Ending: '371635',
            cto_ny_awards: '112',
            cto_ny_Activity: '0',
        }
        let ctoRow2 = {
            ctoTitle: 'Contract Awarded YTD',
            cto_B_Begining: '0',
            cto_ag_YTD: '71486',
            cto_ag_BOY: '0',
            cto_ag_Total: '71486',
            cto_ca_YTD: '654654',
            cto_ca_BOY: '654654',
            cto_ca_Total: '125555',
            cto_b_Ending: '371635',
            cto_ny_awards: '112',
            cto_ny_Activity: '0',
        }
        let ctoRow3 = {
            ctoTitle: 'Pending Awards',
            cto_B_Begining: '0',
            cto_ag_YTD: '71486',
            cto_ag_BOY: '0',
            cto_ag_Total: '71486',
            cto_ca_YTD: '654654',
            cto_ca_BOY: '654654',
            cto_ca_Total: '125555',
            cto_b_Ending: '371635',
            cto_ny_awards: '112',
            cto_ny_Activity: '0',
        }
        let ctoRow4 = {
            ctoTitle: 'Other Future Work',
            cto_B_Begining: '0',
            cto_ag_YTD: '71486',
            cto_ag_BOY: '0',
            cto_ag_Total: '71486',
            cto_ca_YTD: '654654',
            cto_ca_BOY: '654654',
            cto_ca_Total: '125555',
            cto_b_Ending: '371635',
            cto_ny_awards: '112',
            cto_ny_Activity: '0',
        }
        let ctoRow5 = {
            ctoTitle: '2019',
            cto_B_Begining: '0',
            cto_ag_YTD: '71486',
            cto_ag_BOY: '0',
            cto_ag_Total: '71486',
            cto_ca_YTD: '654654',
            cto_ca_BOY: '654654',
            cto_ca_Total: '125555',
            cto_b_Ending: '371635',

        }
        let ctoTotal = {
            ctoTitle: 'Total',
            cto_B_Begining: 0,
            cto_ag_YTD: 0,
            cto_ag_BOY: 0,
            cto_ag_Total: 0,
            cto_ca_YTD: 0,
            cto_ca_BOY: 0,
            cto_ca_Total: 0,
            cto_b_Ending: 0,
            cto_ny_awards: 0,
            cto_ny_Activity: 0,
        }

        ctoRows.push(ctoRow1);
        ctoRows.push(ctoRow2);
        ctoRows.push(ctoRow3);
        ctoRows.push(ctoRow4);


        ctoRows.forEach(function (data, index) {
            ctoTotal.cto_B_Begining +=
                +data.cto_B_Begining || 0;
            ctoTotal.revenue_ag_YTD +=
                +data.cto_ag_YTD || 0;
            ctoTotal.cto_ag_BOY +=
                +data.cto_ag_BOY || 0;
            ctoTotal.cto_ag_Total +=
                +data.cto_ag_Total || 0;
            ctoTotal.cto_ca_YTD +=
                +data.cto_ca_YTD || 0;
            ctoTotal.cto_ca_BOY +=
                +data.cto_ca_BOY || 0;
            ctoTotal.cto_ca_Total +=
                +data.cto_ca_Total || 0;
            ctoTotal.cto_b_Ending +=
                +data.cto_b_Ending || 0;
            ctoTotal.cto_ny_awards +=
                +data.cto_ny_awards || 0;
            ctoTotal.cto_B_Begining +=
                +data.cto_ny_Activity || 0;

        })
        //_________________content for CTO End__________________

        //__________________________content for Adjustment to Gross Profit start__________________________
        let atgpTitle = {
            atgpTitle: '',
            atgp_YTD: 'Year-To-Date',
            atgp_BOY: 'Balance of Year',
            atgp_Total: 'Total',
            atgp_NextYear: 'Next Year'

        }
        let atgpRows = [];
        let atgpRow1 = {
            atgpTitle: 'Retro',
            atgp_YTD: '23293',
            atgp_BOY: '12',
            atgp_Total: '23305',
            atgp_NextYear: '0'

        }
        let atgpRow2 = {
            atgpTitle: 'Yard and Shop',
            atgp_YTD: '23293',
            atgp_BOY: '12',
            atgp_Total: '23305',
            atgp_NextYear: '0'

        }
        let atgpRow4 = {
            atgpTitle: '2019',
            atgp_YTD: '646464',
            atgp_BOY: '646464',
            atgp_Total: '128128',

        }
        atgpRows.push(atgpRow1);
        atgpRows.push(atgpRow2);

        let atgpTotal = {
            atgpTitle: 'Total',
            atgp_YTD: 0,
            atgp_BOY: 0,
            atgp_Total: 0,
            atgp_NextYear: 0
        }

        atgpRows.forEach(function (data, index) {
            atgpTotal.atgp_YTD += +data.atgp_YTD || 0;
            atgpTotal.atgp_BOY += +data.atgp_BOY || 0;
            atgpTotal.atgp_Total += +data.atgp_Total || 0;
            atgpTotal.atgp_NextYear += +data.atgp_NextYear || 0;
        })

        //__________________________content for Adjustment to Gross Profit End__________________________

        //___________________________content for Adjusted Gross Profit start_____________________________

        let agpTitle = {
            agpTitle: '',
            agp_YTD: 'Year-To-Date',
            agp_BOY: 'Balance of Year',
            agp_Total: 'Total',
            agp_NextYear: 'Next Year'

        }
        let agpRows = [];
        let agpRow1 = {
            agpTitle: 'Total',
            agp_YTD: '23293',
            agp_BOY: '12',
            agp_Total: '23305',
            agp_NextYear: '0'

        }
        let agpRow2 = {
            agpTitle: '2019',
            agp_YTD: '646464',
            agp_BOY: '646464',
            agp_Total: '128128',

        }

        //_____________________________content for Adusted Gross Profit End______________________________


        //______________________________content for the G&A Start_______________________________

        let gaTitle = {
            gaTitle: '',
            ga_YTD: 'Year-To-Date',
            ga_BOY: 'Balance of Year',
            ga_Total: 'Total',
            ga_NextYear: 'Next Year'

        }
        let gaRow1 = {
            gaTitle: 'Total',
            ga_YTD: '23293',
            ga_BOY: '12',
            ga_Total: '23305',
            ga_NextYear: '0'

        }
        let gaRow2 = {
            gaTitle: '2019',
            ga_YTD: '646464',
            ga_BOY: '646464',
            ga_Total: '128128',

        }

        //_______________________________content for the G&A End________________________________


        //Content for the OtherExpense Start
        let oeTitle = {
            oeTitle: '',
            oe_YTD: 'Year-To-Date',
            oe_BOY: 'Balance of Year',
            oe_Total: 'Total',
            oe_NextYear: 'Next Year'

        }
        let oeRow1 = {
            oeTitle: 'Total',
            oe_YTD: '23293',
            oe_BOY: '12',
            oe_Total: '23305',
            oe_NextYear: '0'

        }
        let oeRow2 = {
            oeTitle: '2019',
            oe_YTD: '646464',
            oe_BOY: '646464',
            oe_Total: '128128',

        }
        //Content for the OhterExpense ENd_______________

        //_________________Content for the Net Income Start_________________

        let neTitle = {
            neTitle: '',
            ne_YTD: 'Year-To-Date',
            ne_BOY: 'Balance of Year',
            ne_Total: 'Total',
            ne_NextYear: 'Next Year'

        }
        let neRow1 = {
            neTitle: 'Total',
            ne_YTD: '23293',
            ne_BOY: '12',
            ne_Total: '23305',
            ne_NextYear: '0'

        }
        let neRow2 = {
            neTitle: '2019',
            ne_YTD: '646464',
            ne_BOY: '646464',
            ne_Total: '128128',

        }

        //____________________Content for the Net Income End__________________

        // _________________Value for the Pending Awards__________________
        let paTitle = {
            pendingAwardTitle: 'Pending Awards',
            pendingAwardExpDate: 'Exp Awd Date',
            pendingAwardRevenueValue: 'Revenue Value',
            pendingAwardCTOValue: 'CTO Value',
            pendingAwardFYEPrevRev: 'FYE 18 Revenue',
            pendingAwardFYEPrevCTO: 'FYE 18 CTO',
            pendingAwardCurBacklogRev: '2019 Backlog Rev',
            pendingAwardCurBacklogCTO: '2019 Backlog CTO',
            pendingAwardFutureBacklogRev: '2020 Backlog Rev',
            pendingAwardFutureBacklogCTO: '2020 Backlog CTO'
        }

        let paRows = [];
        let paRow1 = {
            pendingAwardTitle: 'Shared Savings',
            pendingAwardExpDate: '1/1/2019',
            pendingAwardRevenueValue: '1',
            pendingAwardCTOValue: '1',
            pendingAwardFYEPrevRev: '1',
            pendingAwardFYEPrevCTO: '1',
            pendingAwardCurBacklogRev: '1',
            pendingAwardCurBacklogCTO: '2',
            pendingAwardFutureBacklogRev: '3',
            pendingAwardFutureBacklogCTO: '4'
        }

        let paRow2 = {
            pendingAwardTitle: 'super',
            pendingAwardExpDate: '3/3/2019',
            pendingAwardRevenueValue: '1',
            pendingAwardCTOValue: '1',
            pendingAwardFYEPrevRev: '1',
            pendingAwardFYEPrevCTO: '1',
            pendingAwardCurBacklogRev: '1',
            pendingAwardCurBacklogCTO: '2',
            pendingAwardFutureBacklogRev: '3',
            pendingAwardFutureBacklogCTO: '4'
        }
        paRows.push(paRow1);
        paRows.push(paRow2);



        var paTotals = {
            pendingAwardTitle: '',
            pendingAwardExpDate: '',
            pendingAwardRevenueValue: 0,
            pendingAwardCTOValue: 0,
            pendingAwardFYEPrevRev: 0,
            pendingAwardFYEPrevCTO: 0,
            pendingAwardCurBacklogRev: 0,
            pendingAwardCurBacklogCTO: 0,
            pendingAwardFutureBacklogRev: 0,
            pendingAwardFutureBacklogCTO: 0,
        };


        paRows.forEach(function (data, index) {
            paTotals.pendingAwardRevenueValue +=
                +data.pendingAwardRevenueValue || 0;
            paTotals.pendingAwardCTOValue += +data.pendingAwardCTOValue;
            paTotals.pendingAwardFYEPrevRev += +data.pendingAwardFYEPrevRev || 0;
            paTotals.pendingAwardFYEPrevCTO += +data.pendingAwardFYEPrevCTO || 0;
            paTotals.pendingAwardCurBacklogRev +=
                +data.pendingAwardCurBacklogRev || 0;
            paTotals.pendingAwardCurBacklogCTO +=
                +data.pendingAwardCurBacklogCTO || 0;
            paTotals.pendingAwardFutureBacklogRev +=
                +data.pendingAwardFutureBacklogRev || 0;
            paTotals.pendingAwardFutureBacklogCTO +=
                +data.pendingAwardFutureBacklogCTO || 0;
        });

        // ___________________value for the Pending Award End________________________





        return (
            <Document>
                <Page size={[1200, 1200]} style={PdfStyles.commonStyles.body} >

                    {/* _____________PDF Header Section Start________________ */}
                    <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                        <View style={{ width: '40%', textAlign: 'center', backgroundColor: 'orange', color: 'white', height: 50 }}>
                            <Text style={{ backgroundColor: 'orange', marginTop: 10, fontSize: 16, width: '98%' }}>Company Name</Text>
                        </View>
                        <View style={{ width: '60%', textAlign: 'left', backgroundColor: 'black', color: 'white', height: 50 }}>
                            <Text style={{ backgroundColor: 'black', color: 'white', marginTop: 15, fontSize: 12, paddingLeft: 15, width: '98%' }}>Dashboard</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 30, }}>
                        <View style={{ textAlign: 'center', flexDirection: 'row', }}>
                            
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 25, }}>
                        <View style={{ textAlign: 'center', flexDirection: 'row' }}>
                            <Text>Business Projection As of 2019</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                        <View style={PdfStyles.commonStyles.leftColumn}>
                            <LabelAndValue label={'Company'} value={' Industry Construction Ltd.'} />
                            <LabelAndValue label={'market'} value={'All'} />
                            <LabelAndValue label={'Year'} value={'2019'} />
                            <LabelAndValue label={'Month'} value={'May'} />
                            <Text>   </Text>
                            <Text style={PdfStyles.commonStyles.Header}>All Numbers in 000`s</Text>
                        </View >
                        <View style={PdfStyles.commonStyles.rightColumn}>
                            <View>
                                <Text style={{ textAlign: 'right', marginRight: "20px" }}>1/1/2048</Text>
                            </View>
                        </View>

                    </View>
                    {/* ________________PDF header section End______________ */}


                    {/* _________________________Revenue Section  Started_______________________*/}
                    <View style={{ height: '300px', width: '100%', backgroundColor: '#7ec6ea' }}>
                        <View style={{ paddingTop: '20px' }}>

                            <View style={{
                                height: '240px', width: '95%', backgroundColor: 'white', marginLeft: '20px', marginRight: '-5px', paddingTop: '0px',  paddingBottom: '5px'
                                ,marginBottom:'10px',borderRadius:'25'  
                            }}>
                                <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', marginTop: '0px'  }}>
                                    <Text style={{ paddingLeft: '10px', fontSize: 20 }}>Revenue</Text>
                                </View>

                                <View style={{ alignItems: 'stretch', width: '95%', height: '210px', marginLeft: '8px' }}>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRowMainHeader revenueRow={revenueMainHeaderTitle} cellBackground='grey' color='white' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRow revenueRow={revenueTitle} cellBackground='#b8b6b4' color='white' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '28px' }}>
                                        <RevenueRow revenueRow={revenueRow1} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRow revenueRow={revenueRow2} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRow revenueRow={revenueRow3} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRow revenueRow={revenueRow4} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ width: '104%', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#112131', borderBottomStyle: 'solid', alignItems: 'stretch', }}></View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRow revenueRow={revenueTotal} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <RevenueRow revenueRow={revenueRow5} cellBackground='white' color='black' />
                                    </View>

                                </View>
                            </View>


                        </View>
                    </View>
                    {/* Revenue Section End */}

                    {/* _____________________CTO Section Start________________________________ */}

                    <View style={{ height: '300px', width: '100%', backgroundColor: '#7ec6ea' }}>
                        <View style={{ paddingTop: '20px' }}>

                            <View style={{
                                height: '240px', width: '95%', backgroundColor: 'white', marginLeft: '20px', marginRight: '-5px', paddingTop: '0px', paddingBottom: '5px'
                                ,borderRadius:25}}>
                                <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                                    <Text style={{ paddingLeft: '10px', fontSize: 20 }}>CTO</Text>
                                </View>

                                <View style={{ alignItems: 'stretch', width: '95%', height: '210px', marginLeft: '8px' }}>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORowMainHeader ctoRow={ctoMainHeaderTitle} cellBackground='grey' color='white' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORow ctoRow={ctoTitle} cellBackground='#b8b6b4' color='white' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '28px' }}>
                                        <CTORow ctoRow={ctoRow1} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORow ctoRow={ctoRow2} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORow ctoRow={ctoRow3} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORow ctoRow={ctoRow4} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ width: '104%', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#112131', borderBottomStyle: 'solid', alignItems: 'stretch', }}></View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORow ctoRow={ctoTotal} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                        <CTORow ctoRow={ctoRow5} cellBackground='white' color='black' />
                                    </View>

                                </View>
                            </View>


                        </View>
                    </View>
                    {/* ____________________________CTO Section End______________________ */}

                    {/* __________Adjustment to gross profit and Adjusted gross profit section start__________ */}
                    <View style={{ height: '200px', width: '100%', backgroundColor: '#7ec6ea', marginTop: '10px' }}>
                        <View style={{ paddingTop: '10px' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: '15px' }}>
                                {/* Adjustment to gross profit start*/}

                                <View style={{
                                    height: '160px', width: '45%', backgroundColor: 'white', marginLeft: '25px', marginRight: '-5px', paddingTop: '0px', paddingBottom: '5px'
                                    ,borderRadius:25}}>
                                    <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                                        <Text style={{ paddingLeft: '10px', fontSize: 20 }}>ADJUSTMENT TO GROSS PROFIT</Text>
                                    </View>
                                    <View style={{ alignItems: 'stretch', width: '95%', height: '130px', marginLeft: '8px' }}>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <ATGPRow atgpRow={atgpTitle} cellBackground='#b8b6b4' color='white' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <ATGPRow atgpRow={atgpRow1} cellBackground='white' color='black' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <ATGPRow atgpRow={atgpRow2} cellBackground='white' color='black' />
                                        </View>
                                        <View style={{ width: '90%', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#112131', borderBottomStyle: 'solid', alignItems: 'stretch', }}></View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <ATGPRow atgpRow={atgpTotal} cellBackground='white' color='black' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <ATGPRow atgpRow={atgpRow4} cellBackground='white' color='black' />
                                        </View>


                                    </View>

                                </View>
                                {/* Adjustment to gross profit end */}

                                {/* Adjusted Gross Profit start */}

                                <View style={{
                                    height: '160px', width: '45%', backgroundColor: 'white', marginLeft: '45px', marginRight: '-5px', paddingTop: '0px', paddingBottom: '5px'
                                    ,borderRadius:25}}>
                                    <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                                        <Text style={{ paddingLeft: '10px', fontSize: 20 }}>ADJUSTED GROSS PROFIT</Text>
                                    </View>
                                    <View style={{ alignItems: 'stretch', width: '95%', height: '130px', marginLeft: '8px' }}>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <AGPRow agpRow={agpTitle} cellBackground='#b8b6b4' color='white' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <AGPRow agpRow={agpRow1} cellBackground='white' color='black' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <AGPRow agpRow={agpRow2} cellBackground='white' color='black' />
                                        </View>


                                    </View>

                                </View>

                                {/* Adjusted Gross Profit End */}
                            </View>
                        </View>

                    </View>
                    {/* ___________Adjustment to gross profit and Adjusted gross profit section end________________ */}

                    {/* __________G&A and Other Income Expense section start__________ */}

                    <View style={{ height: '200px', width: '100%', backgroundColor: '#7ec6ea', marginTop: '30px' }}>
                        <View style={{ paddingTop: '10px' }}>

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: '15px' }}>

                                {/* G&A Section  start*/}
                                <View style={{
                                    height: '160px', width: '45%', backgroundColor: 'white', marginLeft: '25px', marginRight: '-5px', paddingTop: '0px', paddingBottom: '5px'
                                    , float: 'left',borderRadius:25
                                }}>
                                    <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                                        <Text style={{ paddingLeft: '10px', fontSize: 20 }}>G&A</Text>
                                    </View>
                                    <View style={{ alignItems: 'stretch', width: '95%', height: '130px', marginLeft: '8px' }}>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <GARow gaRow={gaTitle} cellBackground='#b8b6b4' color='white' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <GARow gaRow={gaRow1} cellBackground='white' color='black' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <GARow gaRow={gaRow2} cellBackground='white' color='black' />
                                        </View>


                                    </View>

                                </View>

                                {/* G&A Section end */}

                                {/* Other Expense Section Start */}
                                <View style={{
                                    height: '160px', width: '45%', backgroundColor: 'white', marginLeft: '20px', marginLeft: '45px', marginRight: '-5px', paddingTop: '0px', paddingBottom: '5px'
                                    , float: 'left',borderRadius:25
                                }}>
                                    <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                                        <Text style={{ paddingLeft: '10px', fontSize: 20 }}>OTHER EXPENSE/(INCOME)</Text>
                                    </View>
                                    <View style={{ alignItems: 'stretch', width: '95%', height: '130px', marginLeft: '8px' }}>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <OERow oeRow={oeTitle} cellBackground='#b8b6b4' color='white' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <OERow oeRow={oeRow1} cellBackground='white' color='black' />
                                        </View>
                                        <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                            <OERow oeRow={oeRow2} cellBackground='white' color='black' />
                                        </View>


                                    </View>


                                </View>

                                {/* Other Expense Section End */}
                            </View>
                        </View>

                    </View>

                    {/* ___________G&A and Other Income Expense section end________________ */}

                    {/* ____________Net Income Section Start____________________ */}
                    <View style={{ width: '60%', marginLeft: '240px', height: '200px', backgroundColor: '#7ec6ea', marginTop: '30px' }}>
                        <View style={{ paddingTop: '20px' }}>
                        <View style={{
                                height: '160px', width: '95%', backgroundColor: 'white', marginLeft: '20px', marginRight: '-5px', paddingTop: '0px', paddingBottom: '5px'
                                ,borderRadius:25}}>
                        <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                            <Text style={{ paddingLeft: '10px', fontSize: 20 }}>NET INCOME</Text>
                        </View>
                        <View style={{ alignItems: 'stretch', width: '95%', height: '130px', marginLeft: '40px' }}>
                            <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                <NERow neRow={neTitle} cellBackground='#b8b6b4' color='white' />
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                <NERow neRow={neRow1} cellBackground='white' color='black' />
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%', height: '20px' }}>
                                <NERow neRow={neRow2} cellBackground='white' color='black' />
                            </View>


                        </View>
                        </View>
                        </View>

                    </View>
                    {/* ______________Net Income Section End_______________________ */}

                    {/* _____________________________Pending Award Section Started________________________ */}
                    <View style={{ height: '200px', width: '100%', backgroundColor: '#7ec6ea', marginTop: '20px' }}>
                        <View style={{ paddingTop: '20px' }}>

                            <View style={{
                                height: '160px', width: '95%',borderRadius:25, backgroundColor: 'white', marginLeft: '20px', marginRight: '-5px',paddingBottom: '5px'
                            }}>
                                <View style={{ width: '100%', height: '30px', borderRadius: 25, backgroundColor: '#9297a0', marginBottom: '5px', paddingTop: '-5px' }}>
                                    <Text style={{ paddingLeft: '10px', fontSize: 20 }}>Pending Awards</Text>
                                </View>

                                <View style={{ alignItems: 'stretch', width: '90%', marginLeft: '5%' }}>
                                    <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <PaRow paRow={paTitle} cellBackground='grey' color='white' />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <PaRow paRow={paRow1} cellBackground='white' color='black' />
                                    </View>

                                    <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <PaRow paRow={paRow2} cellBackground='white' color='black' />
                                    </View>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#112131', borderBottomStyle: 'solid', alignItems: 'stretch', }}></View>
                                    <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <PaRow paRow={paTotals} cellBackground='white' color='black' />
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                    {/* ____________________________Pending Award Section End_____________________________ */}


                </Page>
            </Document>
        );
    }
}

export default MyDocument;