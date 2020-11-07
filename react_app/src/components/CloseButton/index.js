function CloseButton({ handler }) {
  return (
    <button
      style={{
        background: '#F55145',
        color: 'white',
        border: 'none',
        position: 'absolute',
        right: '10px',
      }}
      onClick={() => handler(false)}
    >
      X
    </button>
  );
}

export default CloseButton;
