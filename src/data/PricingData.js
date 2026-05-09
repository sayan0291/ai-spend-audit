export const TOOLS = [
  {
    id: 'cursor', name: 'Cursor', color: '#000000', initials: 'Cu',
    plans: [
      { id: 'hobby',      label: 'Hobby',      pricePerSeat: 0  },
      { id: 'pro',        label: 'Pro',         pricePerSeat: 20 },
      { id: 'business',   label: 'Business',    pricePerSeat: 40 },
      { id: 'enterprise', label: 'Enterprise',  pricePerSeat: 60 },
    ],
  },
  {
    id: 'github_copilot', name: 'GitHub Copilot', color: '#24292F', initials: 'GH',
    plans: [
      { id: 'individual', label: 'Individual',  pricePerSeat: 10 },
      { id: 'business',   label: 'Business',    pricePerSeat: 19 },
      { id: 'enterprise', label: 'Enterprise',  pricePerSeat: 39 },
    ],
  },
  {
    id: 'claude', name: 'Claude', color: '#CC785C', initials: 'Cl',
    plans: [
      { id: 'free',       label: 'Free',        pricePerSeat: 0   },
      { id: 'pro',        label: 'Pro',         pricePerSeat: 20  },
      { id: 'max',        label: 'Max',         pricePerSeat: 100 },
      { id: 'team',       label: 'Team',        pricePerSeat: 30  },
      { id: 'enterprise', label: 'Enterprise',  pricePerSeat: 60  },
      { id: 'api',        label: 'API direct',  pricePerSeat: 0   },
    ],
  },
  {
    id: 'chatgpt', name: 'ChatGPT', color: '#10A37F', initials: 'GP',
    plans: [
      { id: 'plus',       label: 'Plus',        pricePerSeat: 20 },
      { id: 'team',       label: 'Team',        pricePerSeat: 25 },
      { id: 'enterprise', label: 'Enterprise',  pricePerSeat: 60 },
      { id: 'api',        label: 'API direct',  pricePerSeat: 0  },
    ],
  },
  {
    id: 'anthropic_api', name: 'Anthropic API', color: '#CC785C', initials: 'An',
    plans: [{ id: 'api', label: 'API direct', pricePerSeat: 0 }],
  },
  {
    id: 'openai_api', name: 'OpenAI API', color: '#10A37F', initials: 'OA',
    plans: [{ id: 'api', label: 'API direct', pricePerSeat: 0 }],
  },
  {
    id: 'gemini', name: 'Gemini', color: '#4285F4', initials: 'Gm',
    plans: [
      { id: 'pro',   label: 'Pro',        pricePerSeat: 20 },
      { id: 'ultra', label: 'Ultra',      pricePerSeat: 30 },
      { id: 'api',   label: 'API direct', pricePerSeat: 0  },
    ],
  },
  {
    id: 'windsurf', name: 'Windsurf', color: '#7C3AED', initials: 'Ws',
    plans: [
      { id: 'free',  label: 'Free',  pricePerSeat: 0  },
      { id: 'pro',   label: 'Pro',   pricePerSeat: 15 },
      { id: 'teams', label: 'Teams', pricePerSeat: 30 },
    ],
  },
];

export const getToolById = (id) => TOOLS.find((t) => t.id === id);
export const getPlanById = (tool, planId) => tool?.plans.find((p) => p.id === planId);