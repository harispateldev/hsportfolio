import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { mockData } from '../../data/mockData';

export interface PortfolioState {
  data: typeof mockData;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  data: mockData,
  loading: false,
  error: null,
};

// Async thunk to fetch portfolio data with Axios
export const fetchPortfolioData = createAsyncThunk(
  'portfolio/fetchData',
  async (_) => {
    try {
      // Trying to fetch from a hypothetical local endpoint or actual API
      const response = await axios.get('/api/portfolio-data');
      return response.data;
    } catch (error: any) {
      // If fails, return the mock data as per requirements
      console.warn('API fetch failed, falling back to mock data:', error.message);
      return mockData;
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    // Reducers for manual data updates if needed
    setPortfolioData: (state, action: PayloadAction<typeof mockData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioData.fulfilled, (state, action) => {
        state.loading = false;
        // Validate that the payload has the expected structure (at least the 'hero' property)
        // This prevents overwriting the state with invalid data (like a Vite 404 HTML response)
        if (action.payload && typeof action.payload === 'object' && 'hero' in action.payload) {
          state.data = action.payload;
        } else {
          console.warn('Fetched data is invalid, using mock data instead');
          state.data = mockData;
        }
      })
      .addCase(fetchPortfolioData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message) || 'Failed to fetch data';
        state.data = mockData;
      });
  },
});

export const { setPortfolioData } = portfolioSlice.actions;
export default portfolioSlice.reducer;
