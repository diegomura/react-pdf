import { StyleSheet } from '@react-pdf/renderer';


export const commonStyles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        backgroundColor:'#ebebeb',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        // fontFamily: 'Oswald'
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'green',
    },
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 15,
        '@media max-width: 400': {
          paddingTop: 10,
          paddingLeft: 0,
        },
      },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        height:300,
      }
      ,
    leftColumn: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    rightColumn: {
        flexDirection: 'column',
        flexGrow: 5,
        width:'50%',
        paddingLeft:'150px'
    },

    Title:{
            textAlign:'center'
    },
    Header:{
        fontSize:10
    },
    
    img:{
        width:'80%',
        marginHorizontal: 100,
       
    },
    headerImageContainer:{
        textAlign: 'center',
    },
    
});

export const labelValueStyles = StyleSheet.create({

    itemRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    itemLabel: {
        width: 50,
        fontSize: 10,
    },
    itemContent: {
        flex: 1,
        fontSize: 10,
        //fontFamily: 'Lato',
    },
    itemDivider:{
        marginBottom:5,
        fontSize: 10,
    }
});