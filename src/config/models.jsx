import { Activity, Layers, Network, Zap, Database } from 'lucide-react';

export const MODELS = [
  {
    id: 'rnn',
    name: 'Vanilla RNN',
    desc: '순환 신경망의 기초. Hidden State의 행렬 곱셈과 tanh 연산 과정을 확인합니다.',
    icon: <Activity size={24} />,
    ready: true,
  },
  {
    id: 'transformer',
    name: 'Transformer',
    desc: 'Self-Attention 메커니즘. Q, K, V 행렬 생성 및 Attention Score 계산 과정을 다룹니다.',
    icon: <Layers size={24} />,
    ready: false,
  },
  {
    id: 'linear_rnn',
    name: 'Linear RNN',
    desc: '비선형성(tanh)을 제거하여 연산 속도를 극대화한 현대적 선형 순환 모델 구조입니다.',
    icon: <Network size={24} />,
    ready: false,
  },
  {
    id: 'mamba',
    name: 'Mamba (SSM)',
    desc: '선택적 상태 공간 모델(Selective State Space Model). 입력에 따라 파라미터가 어떻게 변하는지 시각화합니다.',
    icon: <Zap size={24} />,
    ready: false,
  },
  {
    id: 'titans',
    name: 'Titans (MAC)',
    desc: 'Memory as Context 아키텍처. 장기 기억을 위한 신경망 기반 메모리 업데이트 과정을 다룹니다.',
    icon: <Database size={24} />,
    ready: false,
  },
];
