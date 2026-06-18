import React, { useReducer, useEffect, useState } from 'react';
import StagingCanvas from './components/StagingCanvas';
import SelectionControls from './components/SelectionControls';
import LiveMetrics from './components/LiveMetrics';
import JSONManifest from './components/JSONManifest';
import { mockDatabase } from './data/mockDatabase';
import { supabase } from './supabaseClient';

const initialState = {
  type: null,
  case: null,
  dial: null,
  crystal: null,
  strap: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTION':
      return {
        ...state,
        [action.category]: action.item,
      };
    case 'SET_BULK':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const [config, dispatch] = useReducer(reducer, initialState);
  const [dbData, setDbData] = useState({ types: [], cases: [], dials: [], crystals: [], straps: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (supabase) {
        try {
          const [typesReq, casesReq, dialsReq, crystalsReq, strapsReq] = await Promise.all([
            supabase.from('watch_types').select('*').order('id'),
            supabase.from('watch_cases').select('*').order('id'),
            supabase.from('watch_dials').select('*').order('id'),
            supabase.from('watch_crystals').select('*').order('id'),
            supabase.from('watch_straps').select('*').order('id')
          ]);

          const data = {
            types: typesReq.data || [],
            cases: casesReq.data || [],
            dials: dialsReq.data || [],
            crystals: crystalsReq.data || [],
            straps: strapsReq.data || []
          };
          
          if (data.types.length > 0) {
            setDbData(data);
            dispatch({ type: 'SET_SELECTION', category: 'type', item: data.types[0] });
            dispatch({ type: 'SET_SELECTION', category: 'case', item: data.cases[0] });
            dispatch({ type: 'SET_SELECTION', category: 'dial', item: data.dials[1] });
            dispatch({ type: 'SET_SELECTION', category: 'crystal', item: data.crystals[0] });
            dispatch({ type: 'SET_SELECTION', category: 'strap', item: data.straps[1] });
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Supabase fetch failed, falling back to mock data.", error);
        }
      }

      // Fallback to mock data
      setDbData(mockDatabase);
      dispatch({ type: 'SET_SELECTION', category: 'type', item: mockDatabase.types[0] });
      dispatch({ type: 'SET_SELECTION', category: 'case', item: mockDatabase.cases[0] });
      dispatch({ type: 'SET_SELECTION', category: 'dial', item: mockDatabase.dials[1] });
      dispatch({ type: 'SET_SELECTION', category: 'crystal', item: mockDatabase.crystals[0] });
      dispatch({ type: 'SET_SELECTION', category: 'strap', item: mockDatabase.straps[1] });
      setIsLoading(false);
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-matteBlack flex flex-col items-center justify-center font-mono text-neonCyan">
        <div className="w-16 h-16 border-4 border-dashed border-neonCyan rounded-full animate-[spin_3s_linear_infinite] mb-4"></div>
        <p className="animate-pulse tracking-widest uppercase">Initializing ChronoCraft Systems...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-matteBlack text-white p-4 md:p-8 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neonCyan/10 blur-[150px] rounded-full"></div>
      </div>

      <header className="mb-8 z-10 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter flex items-center gap-3">
          <span className="text-white">CHRONO</span>
          <span className="text-neonCyan">CRAFT</span>
        </h1>
        <p className="text-gray-400 mt-2 tracking-widest text-sm uppercase">Interactive Luxury Timepiece Configuration System</p>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
        <div className="lg:col-span-5 h-[500px] lg:h-auto">
          <StagingCanvas config={config} />
        </div>
        <div className="lg:col-span-4 h-[500px] lg:h-[700px]">
          <SelectionControls config={config} dispatch={dispatch} dbData={dbData} />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-6">
          <LiveMetrics config={config} />
          <JSONManifest config={config} />
        </div>
      </main>
    </div>
  );
}

export default App;
