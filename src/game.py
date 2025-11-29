import streamlit as st
from utils import Eventi, Giornata, Scelta
from infoPlayer import Stats

giorni_passati = 0
MAX_GIORNI = 30

def display_stats(player_stat:Stats):
    col1, col2 = st.columns([1,1])
    
    with col1:
        st.markdown(f"###### {giorni_passati+1}° giorno")
        st.markdown(f"Soldi rimanenti: {player_stat.soldi_rimanenti}€")
    with col2:
        st.progress((giorni_passati+1)/MAX_GIORNI)
    st.markdown(f"---")

def display_day_info(giornata:Giornata, evento:Eventi | None = None):
    st.text(giornata.prompt)
    cols = st.columns(giornata.numero_di_scelte)
    for (i,scelta) in enumerate(giornata.scelte_list):
        with cols[i]:
            st.text(scelta.scelta)
            st.button(label=str(scelta.conseguenza))

def increment_day():
    global giorni_passati
    if giorni_passati+1 != MAX_GIORNI:
        giorni_passati += 1

def decrement_day():
    global giorni_passati
    if giorni_passati != 0:
        giorni_passati -= 1

def start_game(calendario: list[Giornata], eventi: list[Eventi]):
    with st.container():
        player_stat = Stats(1000)
        display_stats(player_stat)
        display_day_info(calendario[giorni_passati])

    with st.sidebar:
        st.text("Debug Menù")
        st.button("giorno++", on_click= increment_day)
        st.button("giorno--", on_click= decrement_day)
        
