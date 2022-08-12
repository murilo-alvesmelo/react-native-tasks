import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import commonStyles from "../commonStyles";
import moment from "moment/moment";
import Icon from 'react-native-vector-icons/FontAwesome';

function getCheckView(doneAt){
    if (doneAt != null){
        return(
            <View style={style.done}>
                <Icon name="check" size={20} color='#FFF'/>
            </View>
        )
    }else{
        return(<View style={style.pending}></View>)
    }
}

export default props =>{

    const date = props.doneAt ? props.doneAt : props.estimatedAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')
    const doneOrNotStyle =  props.doneAt != null ? 
        {textDecorationLine: 'line-through'} : {}

    const getRightContent = () =>{
        return(
            <TouchableOpacity 
            style={style.right} 
            onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={20} color='#FFF' />
            </TouchableOpacity>
        )
    }
    const getLefhtContent = () =>{
        return(
            <View style={style.lefth}>
                <Icon name="trash" size={20} color='#FFF' style={style.excludIcon} />
                <Text style={style.excludText}>Excluir</Text>
            </View>
        )
    }

    return(
        <GestureHandlerRootView>
            <Swipeable 
                renderRightActions={getRightContent}
                renderLeftActions={getLefhtContent}
                onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
            >
                <View style={style.container}>
                    <TouchableWithoutFeedback
                        onPress={() => props.toggleTask(props.id)}
                        >
                        <View style={style.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[style.descricao, doneOrNotStyle]}>{props.desc}</Text>
                        <Text style={style.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done:{
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descricao:{
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date:{
        color: commonStyles.colors.subText
    },
    right:{
        backgroundColor: 'red',
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 20
    },
    lefth:{
        backgroundColor: 'red',
        flexDirection: "row",
        alignItems: 'center',
        flex: 1
    },
    excludText:{
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    excludIcon:{
        marginLeft: 10
    }
})