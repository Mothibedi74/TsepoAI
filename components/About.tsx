import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="my-16">
        <div className="max-w-4xl mx-auto bg-dark-card border border-dark-border rounded-lg p-8 shadow-lg">
             <h2 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">About the Creator</h2>
             <p className="text-center text-lg text-gray-300 leading-relaxed">
                Tsepo “Ctrl+S” Motsatse runs on ideas, ambition, and just enough caffeine. He’s that rare kind of multitasker who’s prototyping a GPT in one tab, converting currencies in another, and whispering motivational quotes to PyCharm in the third. No-code? Done. Python? Done. Landing pages? Yup.
                <br/><br/>
                He doesn’t just “ship fast” — he ships smart… and probably has a backup plan for the backup plan.
             </p>
        </div>
    </section>
  );
};

export default About;
