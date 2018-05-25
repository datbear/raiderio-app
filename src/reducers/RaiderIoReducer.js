import * as raiderIo from '../actions/raiderIoActions';
import CharacterReducer from './CharacterReducer';

const defaultState = {
    profiles: [],
    characters: [],
    dungeonOrder: [
        { short_name:'ARC',  dungeon: 'The Arcway'},
        { short_name:'BRH',  dungeon: 'Black Rook Hold'},
        { short_name:'COEN', dungeon: 'Cathedral of Eternal Night'},
        { short_name:'COS',  dungeon: 'Court of Stars'},
        { short_name:'DHT',  dungeon: 'Darkheart Thicket'},
        { short_name:'EOA',  dungeon: 'Eye of Azshara'},
        { short_name:'HOV',  dungeon: 'Halls of Valor'},
        { short_name:'LOWR', dungeon: 'Return to Karazhan: Lower'},
        { short_name:'MOS',  dungeon: 'Maw of Souls'},
        { short_name:'NL',   dungeon: 'Neltharion\'s Lair'},
        { short_name:'SEAT', dungeon: 'Seat of the Triumvirate'},
        { short_name:'UPPR', dungeon: 'Return to Karazhan: Upper'},
        { short_name:'VOTW', dungeon: 'Vault of the Wardens'},
    ]
}

function getCharacter(state, {region, realm, character}){
    var character = state.characters.find(x => x.region === region && x.realm === realm && x.name === character);
    return character || null;
}

function getProfile(state, {region, realm, character}){
    var profile = state.profiles.find(x => x.character.region === region && x.character.realm === realm && x.character.name === character);
    return profile || null;
}

export default (state = defaultState, action) => {
    let { type, payload } = action;
    var characters = CharacterReducer(state.characters, action);

    switch(type){
        case raiderIo.RAIDERIO_PROFILE_DONE: {
            const {region, realm, character, data} = action.payload;
            state = {
                ...state, 
                profiles: state.profiles.filter(p => !(p.region === region && p.realm === realm && p.character === character)).concat(action.payload.data)
            };
            return state;
            break;
        }
        case raiderIo.RAIDERIO_PROFILES_DONE: {
            state.profiles = action.payload;
        }
        case raiderIo.RAIDERIO_SORT_BY_CHAR:{
            const {region, realm, character} = action.payload;
            const profile = getProfile(state, action.payload);
            if(profile != null){
                const dungeons = profile.mythic_plus_best_runs;
                state.dungeonOrder = state.dungeonOrder.concat().sort((a, b) => {
                    var dA = dungeons.find(d => d.short_name === a.short_name);
                    var dB = dungeons.find(d => d.short_name === b.short_name);
                    return (dA.score || 0) > (dB.score || 0) ? -1 : 1;
                });
            }
        }
        default:
            break;
    }
    return {...state, characters};
}