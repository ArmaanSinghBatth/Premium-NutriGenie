// Exercise library. Row = [name, muscle, equip(n/d/b/m), level, kind(s/c/f), sets, pose, prop, tip]
export const STEPS={squat:['Feet shoulder-width, chest tall.','Sit hips back and down under control.','Drive through mid-foot to stand.'],lunge:['Take a long step, torso upright.','Lower until both knees reach 90°.','Push through the front heel to return.'],pushup:['Hands under shoulders, body in one line.','Lower chest to just above the floor.','Press up without sagging the hips.'],plank:['Elbows under shoulders, body straight.','Squeeze glutes and abs.','Breathe steadily and hold.'],climber:['Start in a high plank.','Drive knees to chest alternately.','Keep hips low and move fast.'],bridge:['Lie back, feet flat, knees bent.','Drive hips up, squeeze glutes at the top.','Lower slowly and repeat.'],jump:['Drop into a quarter squat.','Explode up, reaching overhead.','Land softly and reset.'],press:['Start at shoulder height, core braced.','Press straight overhead until arms lock.','Lower under control.'],row:['Hinge forward with a flat back.','Pull the weight toward your hip.','Squeeze the shoulder blade, lower slowly.'],deadlift:['Flat back, weight close to your legs.','Push the floor away and stand tall.','Lower by hinging at the hips.'],crunch:['Lie back, knees bent.','Curl ribs toward hips.','Lower slowly, don’t pull your neck.'],fold:['Reach tall and inhale.','Hinge and fold forward on the exhale.','Let your arms hang and breathe.'],run:['Stay tall with relaxed shoulders.','Drive your arms, land softly.','Keep a steady breathing rhythm.'],pulldown:['Grip slightly wider than shoulders.','Pull the bar to your upper chest.','Return slowly to full stretch.'],srow:['Sit tall, chest up.','Pull the handle to your belly.','Squeeze shoulder blades, return slowly.'],bench:['Eyes under the bar or handles, feet planted.','Lower to mid-chest with control.','Press up and slightly back.'],curl:['Elbows pinned to your sides.','Curl to shoulder height.','Lower slowly, no swinging.'],legpress:['Feet shoulder-width on the platform.','Lower until knees reach about 90°.','Press through heels, never lock the knees.'],legext:['Set the pad just above your ankles.','Extend until legs are nearly straight.','Lower slowly, no swinging.'],legcurl:['Set the pad just above your heels.','Curl heels toward your glutes.','Return slowly to the start.'],cpress:['Handles at chest height, shoulders back.','Press forward until arms are straight.','Return slowly, back on the pad.'],spress:['Set the seat so handles are at shoulder height.','Press overhead without arching your back.','Lower with control.'],calf:['Balls of feet on the edge, stand tall.','Rise as high as you can, pause 1 s.','Lower into a deep stretch.'],pushdown:['Elbows tucked at your sides.','Press down until arms are straight.','Return slowly to chest height.'],pullup:['Hang with active shoulders.','Pull your chest toward the bar.','Lower to a full hang.'],bike:['Set the seat to hip height.','Keep a smooth, even cadence.','Change resistance for intervals.'],pecdeck:['Set the seat so handles are at chest height.','Bring the handles together in a wide hugging arc.','Pause, then open slowly with soft elbows.'],revfly:['Face the pad with your chest supported.','Open your arms wide, squeezing the shoulder blades.','Return slowly without letting the weights touch.'],cflylow:['Set pulleys low, step forward, slight lean.','Sweep hands up and together to chin height.','Lower slowly with soft elbows.'],cflyhigh:['Set pulleys high, step forward, slight lean.','Sweep hands down and together to hip height.','Return slowly and feel the chest stretch.'],dbfly:['Dumbbells over your chest, elbows soft.','Lower in a wide arc until you feel a stretch.','Squeeze back up along the same arc.'],lateral:['Stand tall, slight bend in the elbows.','Raise arms out to shoulder height.','Lower slowly, no swinging.'],straightarm:['Hinge slightly, arms straight at the top.','Sweep the bar down to your thighs.','Return slowly and feel your lats.'],swing:['Hinge back, hands between your legs.','Snap your hips forward, swing to chest height.','Let it fall and hinge again, back flat.'],legraise:['Lie flat, lower back pressed down.','Raise your legs together to vertical.','Lower slowly without touching the floor.'],hangraise:['Hang with active shoulders.','Raise your legs without swinging.','Lower slowly under control.'],rower:['Drive with your legs first.','Lean back slightly, pull to your ribs.','Return arms, then body, then legs.']};
export const X=[
['Bodyweight Squat','Legs','n',0,'s','3 × 15','squat'],['Reverse Lunge','Legs','n',0,'s','3 × 10 / leg','lunge'],['Split Squat','Legs','n',0,'s','3 × 10 / leg','lunge'],['Bodyweight Calf Raise','Legs','n',0,'s','3 × 20','calf'],['Glute Bridge','Glutes','n',0,'s','3 × 15','bridge'],['Single-leg Glute Bridge','Glutes','n',1,'s','3 × 10 / leg','bridge'],
['Push-up','Chest','n',0,'s','3 × 10','pushup'],['Wide Push-up','Chest','n',0,'s','3 × 10','pushup'],['Diamond Push-up','Arms','n',1,'s','3 × 8','pushup'],['Shoulder-tap Plank','Shoulders','n',0,'s','3 × 20','plank'],
['Forearm Plank','Core','n',0,'s','3 × 40 s','plank'],['Sit-up Crunch','Core','n',0,'s','3 × 20','crunch'],['Mountain Climbers','Core','n',0,'c','4 × 30 s','climber'],['Squat Jumps','Cardio','n',1,'c','4 × 12','jump'],['Tuck Jumps','Cardio','n',1,'c','4 × 10','jump'],['High-knee Run','Cardio','n',0,'c','5 × 40 s','run'],['Forward Fold Reach','Core','n',0,'f','2 × 30 s','fold'],
['Dumbbell Goblet Squat','Legs','d',0,'s','4 × 12','squat','db'],['Dumbbell Walking Lunge','Legs','d',0,'s','3 × 10 / leg','lunge','db'],['Dumbbell Romanian Deadlift','Glutes','d',1,'s','3 × 10','deadlift','db'],['Dumbbell Hip Thrust','Glutes','d',0,'s','3 × 12','bridge'],['Dumbbell Calf Raise','Legs','d',0,'s','3 × 15','calf','db'],
['Dumbbell Bench Press','Chest','d',0,'s','3 × 10','bench','db'],['Incline Dumbbell Press','Chest','d',1,'s','3 × 10','bench','db'],['Dumbbell Row','Back','d',0,'s','3 × 12 / arm','row','db'],['Dumbbell Shoulder Press','Shoulders','d',0,'s','3 × 10','press','db'],['Dumbbell Bicep Curl','Arms','d',0,'s','3 × 12','curl','db'],['Hammer Curl','Arms','d',0,'s','3 × 12','curl','db'],['Overhead Triceps Extension','Arms','d',0,'s','3 × 12','press','db'],
['Barbell Back Squat','Legs','b',1,'s','4 × 8','squat','plate','Brace hard before every rep.'],['Barbell Front Squat','Legs','b',1,'s','4 × 6','squat','plate','Keep elbows high.'],['Barbell Lunge','Legs','b',1,'s','3 × 8 / leg','lunge','plate'],['Conventional Deadlift','Back','b',1,'s','4 × 5','deadlift','plate','Bar stays touching your legs.'],['Barbell Hip Thrust','Glutes','b',1,'s','4 × 8','bridge'],['Good Morning','Glutes','b',1,'s','3 × 10','fold'],
['Barbell Bench Press','Chest','b',0,'s','4 × 8','bench','plate','Use a spotter for heavy sets.'],['Incline Barbell Press','Chest','b',1,'s','4 × 8','bench','plate'],['Skull Crushers','Arms','b',0,'s','3 × 10','bench','plate'],['Barbell Row','Back','b',1,'s','4 × 8','row','plate'],['Barbell Overhead Press','Shoulders','b',1,'s','4 × 8','press','plate'],['Barbell Curl','Arms','b',0,'s','3 × 10','curl','plate'],['Pull-up','Back','b',1,'s','3 × 6–10','pullup'],['Chin-up','Back','b',1,'s','3 × 6–10','pullup'],
['Leg Press','Legs','m',0,'s','4 × 12','legpress','','Don’t let your lower back lift off the pad.'],['Hack Squat Machine','Legs','m',0,'s','4 × 10','squat'],['Smith Machine Squat','Legs','m',0,'s','4 × 10','squat','plate'],['Leg Extension Machine','Legs','m',0,'s','3 × 12','legext'],['Seated Leg Curl Machine','Legs','m',0,'s','3 × 12','legcurl'],['Lying Leg Curl Machine','Legs','m',0,'s','3 × 12','legcurl'],['Hip Abductor Machine','Glutes','m',0,'s','3 × 15','legext'],['Hip Adductor Machine','Legs','m',0,'s','3 × 15','legext'],['Hip Thrust Machine','Glutes','m',0,'s','4 × 10','bridge'],['Standing Calf Raise Machine','Legs','m',0,'s','4 × 15','calf'],['Seated Calf Raise Machine','Legs','m',0,'s','4 × 15','calf'],
['Chest Press Machine','Chest','m',0,'s','3 × 12','cpress'],['Incline Chest Press Machine (upper chest)','Chest','m',0,'s','3 × 12','cpress'],['Pec Deck Fly (Chest Fly Machine)','Chest','m',0,'s','3 × 12','pecdeck','','Keep a soft bend in your elbows.'],['Cable Crossover','Chest','m',0,'s','3 × 12','cflyhigh'],['Smith Machine Bench Press','Chest','m',0,'s','4 × 10','bench','plate'],
['Lat Pulldown','Back','m',0,'s','3 × 12','pulldown'],['Close-grip Pulldown','Back','m',0,'s','3 × 12','pulldown'],['Seated Cable Row','Back','m',0,'s','3 × 12','srow'],['Assisted Pull-up Machine','Back','m',0,'s','3 × 8','pullup'],['T-bar Row','Back','m',1,'s','3 × 10','row','plate'],['Back Extension','Back','m',0,'s','3 × 12','fold'],
['Shoulder Press Machine','Shoulders','m',0,'s','3 × 12','spress'],['Lateral Raise Machine','Shoulders','m',0,'s','3 × 15','spress'],['Reverse Pec Deck (Rear Delt)','Shoulders','m',0,'s','3 × 15','revfly'],['Cable Face Pull','Shoulders','m',0,'s','3 × 15','srow'],
['Triceps Pushdown','Arms','m',0,'s','3 × 12','pushdown'],['Triceps Dip Machine','Arms','m',0,'s','3 × 12','pushdown'],['Cable Bicep Curl','Arms','m',0,'s','3 × 12','curl'],['Preacher Curl Machine','Arms','m',0,'s','3 × 12','curl'],
['Ab Crunch Machine','Core','m',0,'s','3 × 15','crunch'],['Cable Crunch','Core','m',0,'s','3 × 15','crunch'],
['Decline Chest Press Machine (lower chest)','Chest','m',0,'s','3 × 12','cpress'],['Cable Fly Low-to-High (upper chest)','Chest','m',0,'s','3 × 12','cflylow','','Sweep up toward your chin.'],['Cable Fly High-to-Low (lower chest)','Chest','m',0,'s','3 × 12','cflyhigh','','Sweep down toward your hips.'],['Dumbbell Chest Fly','Chest','d',0,'s','3 × 12','dbfly','db'],['Incline Dumbbell Fly (upper chest)','Chest','d',1,'s','3 × 12','dbfly','db'],
['Wide-grip Lat Pulldown','Back','m',0,'s','3 × 12','pulldown'],['Reverse-grip Lat Pulldown','Back','m',0,'s','3 × 12','pulldown'],['Single-arm Lat Pulldown','Back','m',0,'s','3 × 12 / arm','pulldown'],['Straight-arm Pulldown','Back','m',0,'s','3 × 12','straightarm'],['Chest-supported Machine Row','Back','m',0,'s','3 × 12','srow'],
['Triceps Rope Pushdown','Arms','m',0,'s','3 × 12','pushdown'],['Overhead Cable Triceps Extension','Arms','m',0,'s','3 × 12','press'],['Machine Triceps Extension','Arms','m',0,'s','3 × 12','pushdown'],['Close-grip Bench Press (triceps)','Arms','b',0,'s','4 × 8','bench','plate'],['Rope Hammer Curl','Arms','m',0,'s','3 × 12','curl'],['Incline Dumbbell Curl','Arms','d',0,'s','3 × 10','curl','db'],
['Cable Lateral Raise','Shoulders','m',0,'s','3 × 15','lateral'],['Dumbbell Lateral Raise','Shoulders','d',0,'s','3 × 15','lateral','db'],
['Treadmill Intervals','Cardio','m',0,'c','8 × 1 min','run','','Sprint 1 min, jog 1 min.'],['Incline Treadmill Walk','Cardio','m',0,'c','15 min','run'],['Stationary Bike','Cardio','m',0,'c','15 min','bike'],['Spin Bike Sprints','Cardio','m',1,'c','10 × 30 s','bike'],['Rowing Machine','Cardio','m',0,'c','5 × 2 min','rower'],['Elliptical Trainer','Cardio','m',0,'c','15 min','run'],['Stair Climber','Cardio','m',0,'c','12 min','run']];
const X2=`Jumping Jacks|Cardio|n|0|c|4 × 40 s|jump
Burpee|Cardio|n|1|c|4 × 10|jump
Skater Hops|Cardio|n|1|c|4 × 20|lunge
Jump Rope|Cardio|n|0|c|5 × 1 min|jump
Sprint Intervals|Cardio|n|1|c|8 × 20 s|run
Butt Kicks|Cardio|n|0|c|4 × 30 s|run
Shadow Boxing|Cardio|n|0|c|5 × 1 min|run
Jump Lunges|Legs|n|1|c|4 × 12 / leg|lunge
Bear Crawl|Core|n|1|c|4 × 30 s|climber
Knee Push-up|Chest|n|0|s|3 × 12|pushup
Decline Push-up|Chest|n|1|s|3 × 10|pushup
Archer Push-up|Chest|n|1|s|3 × 6 / side|pushup
Close-grip Push-up|Arms|n|0|s|3 × 10|pushup
Pike Push-up|Shoulders|n|1|s|3 × 8|pushup
Bench Tricep Dip|Arms|n|0|s|3 × 12|pushup
Parallel Bar Dips|Chest|b|1|s|3 × 8|pushup
Superman Hold|Back|n|0|s|3 × 30 s|plank
Bird Dog|Core|n|0|s|3 × 10 / side|plank
Dead Bug|Core|n|0|s|3 × 12|crunch
Leg Raise|Core|n|0|s|3 × 12|legraise
Flutter Kicks|Core|n|0|s|3 × 30 s|legraise
Reverse Crunch|Core|n|0|s|3 × 15|legraise
Bicycle Crunch|Core|n|0|s|3 × 20|crunch
V-up|Core|n|1|s|3 × 12|crunch
Russian Twist|Core|n|0|s|3 × 20|crunch
Hollow Hold|Core|n|1|s|3 × 30 s|crunch
Side Plank|Core|n|0|s|3 × 30 s / side|plank
Plank Up-down|Core|n|1|s|3 × 10|pushup
Wall Sit|Legs|n|0|s|3 × 40 s|squat
Lateral Lunge|Legs|n|0|s|3 × 10 / side|lunge
Curtsy Lunge|Glutes|n|0|s|3 × 10 / leg|lunge
Step-up|Legs|n|0|s|3 × 10 / leg|lunge
Sumo Squat|Legs|n|0|s|3 × 15|squat
Pulse Squat|Legs|n|0|s|3 × 20|squat
Pistol Squat Progression|Legs|n|1|s|3 × 5 / leg|squat
Glute Kickback|Glutes|n|0|s|3 × 15 / leg|plank
Donkey Kick|Glutes|n|0|s|3 × 15 / leg|plank
Fire Hydrant|Glutes|n|0|s|3 × 15 / leg|plank
Frog Pump|Glutes|n|0|s|3 × 20|bridge
Marching Bridge|Glutes|n|0|s|3 × 20|bridge
Inchworm|Core|n|0|s|3 × 8|fold
Cat-Cow Stretch|Mobility|n|0|f|2 × 10|plank
Child's Pose|Mobility|n|0|f|2 × 30 s|fold
Hamstring Stretch|Mobility|n|0|f|2 × 30 s|fold
Hip Flexor Stretch|Mobility|n|0|f|2 × 30 s / side|lunge
Quad Stretch|Mobility|n|0|f|2 × 30 s / side|lunge
Chest Opener Stretch|Mobility|n|0|f|2 × 30 s|press
Shoulder Cross-body Stretch|Mobility|n|0|f|2 × 30 s / side|press
Cobra Stretch|Mobility|n|0|f|2 × 30 s|pushup
Dumbbell Front Squat|Legs|d|0|s|3 × 10|squat|db
Dumbbell Sumo Squat|Legs|d|0|s|3 × 12|squat|db
Dumbbell Step-up|Legs|d|0|s|3 × 10 / leg|lunge|db
Dumbbell Bulgarian Split Squat|Legs|d|1|s|3 × 8 / leg|lunge|db
Dumbbell Stiff-leg Deadlift|Glutes|d|0|s|3 × 10|deadlift|db
Single-leg Romanian Deadlift|Glutes|d|1|s|3 × 8 / leg|deadlift|db
Dumbbell Thruster|Legs|d|1|s|3 × 10|squat|db
Dumbbell Floor Press|Chest|d|0|s|3 × 10|bench|db
Decline Dumbbell Press|Chest|d|1|s|3 × 10|bench|db
Dumbbell Pullover|Back|d|0|s|3 × 12|bench|db
Dumbbell Squeeze Press|Chest|d|0|s|3 × 12|bench|db
Renegade Row|Back|d|1|s|3 × 8 / arm|row|db
Chest-supported Dumbbell Row|Back|d|0|s|3 × 12|row|db
Bent-over Reverse Fly|Shoulders|d|0|s|3 × 12|row|db
Dumbbell Arnold Press|Shoulders|d|1|s|3 × 10|press|db
Dumbbell Front Raise|Shoulders|d|0|s|3 × 12|lateral|db
Dumbbell Shrug|Back|d|0|s|3 × 15|curl|db
Concentration Curl|Arms|d|0|s|3 × 12 / arm|curl|db
Zottman Curl|Arms|d|1|s|3 × 10|curl|db
Cross-body Hammer Curl|Arms|d|0|s|3 × 12|curl|db
Dumbbell Triceps Kickback|Arms|d|0|s|3 × 12|row|db
Dumbbell Skull Crusher|Arms|d|0|s|3 × 10|bench|db
Kettlebell Swing|Glutes|d|1|c|4 × 15|swing|db
Farmer's Carry|Core|d|0|s|3 × 40 s|run|db
Dumbbell Woodchopper|Core|d|0|s|3 × 12 / side|press|db
Weighted Sit-up|Core|d|0|s|3 × 15|crunch|db
Sumo Deadlift|Legs|b|1|s|4 × 5|deadlift|plate
Barbell Romanian Deadlift|Glutes|b|1|s|3 × 8|deadlift|plate
Trap-bar Deadlift|Legs|b|1|s|4 × 5|deadlift|plate
Rack Pull|Back|b|1|s|4 × 5|deadlift|plate
Pendlay Row|Back|b|1|s|4 × 6|row|plate
Reverse-grip Barbell Row|Back|b|1|s|3 × 8|row|plate
Landmine Press|Shoulders|b|1|s|3 × 10|press|plate
Push Press|Shoulders|b|1|s|4 × 6|press|plate
Barbell Shrug|Back|b|0|s|3 × 12|deadlift|plate
Decline Barbell Bench Press|Chest|b|1|s|4 × 8|bench|plate
Barbell Floor Press|Chest|b|0|s|3 × 8|bench|plate
EZ-bar Curl|Arms|b|0|s|3 × 10|curl|plate
Reverse Barbell Curl|Arms|b|0|s|3 × 10|curl|plate
EZ-bar Skull Crusher|Arms|b|0|s|3 × 10|bench|plate
Barbell Split Squat|Legs|b|1|s|3 × 8 / leg|lunge|plate
Barbell Step-up|Legs|b|1|s|3 × 8 / leg|lunge|plate
Zercher Squat|Legs|b|1|s|3 × 6|squat|plate
Box Squat|Legs|b|1|s|4 × 6|squat|plate
Pause Squat|Legs|b|1|s|3 × 5|squat|plate
Barbell Calf Raise|Legs|b|0|s|4 × 15|calf|plate
Barbell Glute Bridge|Glutes|b|0|s|3 × 12|bridge
Hanging Leg Raise|Core|b|1|s|3 × 10|hangraise
Hanging Knee Raise|Core|b|0|s|3 × 12|hangraise
Toes-to-bar|Core|b|1|s|3 × 8|hangraise
Wide-grip Pull-up|Back|b|1|s|3 × 6–8|pullup
Neutral-grip Pull-up|Back|b|1|s|3 × 6–8|pullup
Inverted Row|Back|b|0|s|3 × 10|srow
Ab Wheel Rollout|Core|b|1|s|3 × 8|plank
Smith Machine Lunge|Legs|m|0|s|3 × 10 / leg|lunge|plate
Smith Machine Romanian Deadlift|Glutes|m|0|s|3 × 10|deadlift|plate
Smith Machine Row|Back|m|0|s|3 × 10|row|plate
Smith Machine Shoulder Press|Shoulders|m|0|s|3 × 10|press|plate
Smith Machine Incline Press|Chest|m|0|s|3 × 10|bench|plate
Smith Machine Calf Raise|Legs|m|0|s|4 × 15|calf
Pendulum Squat|Legs|m|0|s|4 × 10|squat
Belt Squat|Legs|m|0|s|4 × 12|squat
Sissy Squat Machine|Legs|m|1|s|3 × 12|squat
Reverse Hyperextension|Glutes|m|0|s|3 × 12|fold
Glute Kickback Machine|Glutes|m|0|s|3 × 12 / leg|bridge
Cable Pull-through|Glutes|m|0|s|3 × 12|deadlift
High Row Machine|Back|m|0|s|3 × 12|srow
Low Row Machine|Back|m|0|s|3 × 12|srow
Iso-lateral Row Machine|Back|m|0|s|3 × 10 / arm|srow
Machine Pullover|Back|m|0|s|3 × 12|pulldown
Cable Pullover|Back|m|0|s|3 × 12|straightarm
Cable Upright Row|Shoulders|m|0|s|3 × 12|curl
Cable Front Raise|Shoulders|m|0|s|3 × 12|lateral
Cable Rear Delt Fly|Shoulders|m|0|s|3 × 15|srow
Cable Y-Raise|Shoulders|m|1|s|3 × 12|lateral
Cable Chest Press|Chest|m|0|s|3 × 12|cpress
Cable Fly Mid (middle chest)|Chest|m|0|s|3 × 12|pecdeck
Assisted Dip Machine|Arms|m|0|s|3 × 8|pushdown
Single-arm Cable Pushdown|Arms|m|0|s|3 × 12 / arm|pushdown
Reverse-grip Pushdown|Arms|m|0|s|3 × 12|pushdown
Cable Triceps Kickback|Arms|m|0|s|3 × 12|pushdown
High Cable Curl|Arms|m|0|s|3 × 12|curl
Machine Biceps Curl|Arms|m|0|s|3 × 12|curl
Cable Woodchopper|Core|m|0|s|3 × 12 / side|pushdown
Pallof Press|Core|m|0|s|3 × 12 / side|srow
Torso Rotation Machine|Core|m|0|s|3 × 15|crunch
Captain's Chair Leg Raise|Core|m|0|s|3 × 12|hangraise
Roman Chair Sit-up|Core|m|0|s|3 × 15|crunch
Assault Bike|Cardio|m|0|c|8 × 30 s|bike
Air Bike Intervals|Cardio|m|1|c|10 × 20 s|bike
Cycling Hill Climb|Cardio|m|0|c|15 min|bike
Ski Erg|Cardio|m|0|c|5 × 1 min|straightarm
Treadmill Hill Sprints|Cardio|m|1|c|8 × 30 s|run
Treadmill Walk-Run|Cardio|m|0|c|20 min|run
Row Intervals|Cardio|m|1|c|6 × 500 m|rower
Battle Ropes|Cardio|m|1|c|6 × 30 s|jump
Sled Push|Cardio|m|1|c|6 × 20 m|run
Reverse Cross Trainer|Cardio|m|0|c|12 min|run
Jacob's Ladder|Cardio|m|1|c|10 min|run
Step Mill|Cardio|m|0|c|12 min|run`.split('\n').map(l=>{const a=l.split('|');return [a[0],a[1],a[2],+a[3],a[4],a[5],a[6],a[7]||'',a[8]||'']});X.push(...X2);
export const TN={'10 min':3,'15 min':4,'20 min':5,'30 min':6,'45 min':8,'60 min':10,'75 min':12,'90 min':14};
