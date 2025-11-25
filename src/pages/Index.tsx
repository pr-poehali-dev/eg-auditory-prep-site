import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AudioTrack {
  id: number;
  title: string;
  level: 'ОГЭ' | 'ЕГЭ';
  duration: string;
  completed: boolean;
}

interface TestResult {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  date: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'training' | 'tests' | 'progress' | 'instructions'>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [currentTime, setCurrentTime] = useState(0);

  const audioTracks: AudioTrack[] = [
    { id: 1, title: 'Диалог в аэропорту', level: 'ОГЭ', duration: '2:30', completed: true },
    { id: 2, title: 'Интервью с учёным', level: 'ЕГЭ', duration: '4:15', completed: false },
    { id: 3, title: 'Объявление на вокзале', level: 'ОГЭ', duration: '1:45', completed: false },
    { id: 4, title: 'Лекция о климате', level: 'ЕГЭ', duration: '5:20', completed: false },
  ];

  const testResults: TestResult[] = [
    { id: 1, name: 'Тест ОГЭ #1', score: 18, maxScore: 20, date: '20.11.2025' },
    { id: 2, name: 'Тест ЕГЭ #1', score: 15, maxScore: 20, date: '18.11.2025' },
    { id: 3, name: 'Тест ОГЭ #2', score: 19, maxScore: 20, date: '15.11.2025' },
  ];

  const instructions = [
    {
      title: 'Подготовка к ОГЭ',
      items: [
        'Раздел 1: Понимание основного содержания (4 задания)',
        'Раздел 2: Понимание запрашиваемой информации (5 заданий)',
        'Раздел 3: Полное понимание текста (1 задание)',
        'Общее время аудирования: 30 минут',
      ],
    },
    {
      title: 'Подготовка к ЕГЭ',
      items: [
        'Задание 1: Установление соответствий (6 заданий)',
        'Задание 2: Выбор правильного ответа (7 заданий)',
        'Задание 3-9: Множественный выбор (7 заданий)',
        'Общее время аудирования: 35 минут',
      ],
    },
  ];

  const totalProgress = Math.round((audioTracks.filter(t => t.completed).length / audioTracks.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mr-8">
            <Icon name="Headphones" className="text-primary" size={28} />
            <h1 className="text-2xl font-bold font-heading text-primary">EGE Audio</h1>
          </div>
          <nav className="flex gap-1">
            <Button
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('home')}
              className="gap-2"
            >
              <Icon name="Home" size={18} />
              Главная
            </Button>
            <Button
              variant={activeSection === 'training' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('training')}
              className="gap-2"
            >
              <Icon name="PlayCircle" size={18} />
              Тренировка
            </Button>
            <Button
              variant={activeSection === 'tests' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('tests')}
              className="gap-2"
            >
              <Icon name="ClipboardList" size={18} />
              Тесты
            </Button>
            <Button
              variant={activeSection === 'progress' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('progress')}
              className="gap-2"
            >
              <Icon name="TrendingUp" size={18} />
              Прогресс
            </Button>
            <Button
              variant={activeSection === 'instructions' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('instructions')}
              className="gap-2"
            >
              <Icon name="BookOpen" size={18} />
              Инструкции
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-12">
              <h2 className="text-5xl font-bold font-heading text-foreground">
                Подготовка к аудированию
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Тренируйся эффективно с нашими инструментами для ОГЭ и ЕГЭ по английскому языку
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('training')}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Headphones" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="font-heading">Интерактивный плеер</CardTitle>
                  <CardDescription>
                    Замедляйте, повторяйте и останавливайте аудио для лучшего понимания
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('tests')}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Target" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="font-heading">Тесты ОГЭ/ЕГЭ</CardTitle>
                  <CardDescription>
                    Проходите тестирования в формате экзамена и отслеживайте результаты
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('progress')}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="BarChart3" className="text-primary" size={24} />
                  </div>
                  <CardTitle className="font-heading">Отслеживание прогресса</CardTitle>
                  <CardDescription>
                    Визуализируйте свои достижения и анализируйте слабые места
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="Lightbulb" className="text-primary" size={24} />
                  Совет дня
                </CardTitle>
                <CardDescription className="text-base">
                  Слушайте аудиозаписи несколько раз на разных скоростях. Начните с медленной скорости (0.75x), 
                  затем постепенно увеличивайте до нормальной. Это поможет лучше воспринимать быструю речь на экзамене.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {activeSection === 'training' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-2">Тренировка</h2>
              <p className="text-muted-foreground">Выберите аудиозапись для практики</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="oge">ОГЭ</TabsTrigger>
                <TabsTrigger value="ege">ЕГЭ</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-6">
                {audioTracks.map((track) => (
                  <Card key={track.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name={track.completed ? 'CheckCircle2' : 'Circle'} 
                                  className={track.completed ? 'text-primary' : 'text-muted-foreground'} 
                                  size={24} />
                          </div>
                          <div>
                            <CardTitle className="font-heading">{track.title}</CardTitle>
                            <div className="flex gap-2 mt-1">
                              <Badge variant={track.level === 'ЕГЭ' ? 'default' : 'secondary'}>
                                {track.level}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                {track.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Icon name="Play" size={16} />
                          Слушать
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="oge" className="space-y-4 mt-6">
                {audioTracks.filter(t => t.level === 'ОГЭ').map((track) => (
                  <Card key={track.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name={track.completed ? 'CheckCircle2' : 'Circle'} 
                                  className={track.completed ? 'text-primary' : 'text-muted-foreground'} 
                                  size={24} />
                          </div>
                          <div>
                            <CardTitle className="font-heading">{track.title}</CardTitle>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary">{track.level}</Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                {track.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Icon name="Play" size={16} />
                          Слушать
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="ege" className="space-y-4 mt-6">
                {audioTracks.filter(t => t.level === 'ЕГЭ').map((track) => (
                  <Card key={track.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name={track.completed ? 'CheckCircle2' : 'Circle'} 
                                  className={track.completed ? 'text-primary' : 'text-muted-foreground'} 
                                  size={24} />
                          </div>
                          <div>
                            <CardTitle className="font-heading">{track.title}</CardTitle>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="default">{track.level}</Badge>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                {track.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Icon name="Play" size={16} />
                          Слушать
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Аудиоплеер</CardTitle>
                <CardDescription>Управляйте воспроизведением для эффективного обучения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon">
                    <Icon name="SkipBack" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Rewind" size={20} />
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-14 h-14"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="FastForward" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="SkipForward" size={20} />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0:00</span>
                    <span>2:30</span>
                  </div>
                  <Slider 
                    value={[currentTime]} 
                    max={150} 
                    step={1} 
                    onValueChange={(val) => setCurrentTime(val[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Скорость воспроизведения</span>
                    <Badge variant="outline">{playbackSpeed[0]}x</Badge>
                  </div>
                  <Slider 
                    value={playbackSpeed} 
                    min={0.5} 
                    max={2} 
                    step={0.25} 
                    onValueChange={setPlaybackSpeed}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.5x</span>
                    <span>1x</span>
                    <span>2x</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="RotateCcw" size={16} />
                    Повторить отрывок
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Download" size={16} />
                    Скачать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'tests' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-2">Тесты</h2>
              <p className="text-muted-foreground">Проверьте свои знания в формате экзамена</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-base">ОГЭ</Badge>
                    <Icon name="FileAudio" className="text-primary" size={32} />
                  </div>
                  <CardTitle className="font-heading text-2xl">Тест ОГЭ</CardTitle>
                  <CardDescription className="text-base">
                    10 заданий • 30 минут • Формат экзамена 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gap-2" size="lg">
                    <Icon name="Play" size={20} />
                    Начать тест
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="text-base">ЕГЭ</Badge>
                    <Icon name="FileAudio" className="text-primary" size={32} />
                  </div>
                  <CardTitle className="font-heading text-2xl">Тест ЕГЭ</CardTitle>
                  <CardDescription className="text-base">
                    20 заданий • 35 минут • Формат экзамена 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gap-2" size="lg">
                    <Icon name="Play" size={20} />
                    Начать тест
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Последние результаты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name="Award" className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold">{result.name}</p>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {result.score}/{result.maxScore}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((result.score / result.maxScore) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'progress' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-2">Прогресс</h2>
              <p className="text-muted-foreground">Отслеживайте свои достижения</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Общая статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Пройдено аудиозаписей</span>
                    <span className="text-primary font-bold">{totalProgress}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-3" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5">
                    <Icon name="Headphones" className="mx-auto mb-2 text-primary" size={32} />
                    <p className="text-3xl font-bold">{audioTracks.filter(t => t.completed).length}</p>
                    <p className="text-sm text-muted-foreground">Завершено</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5">
                    <Icon name="Target" className="mx-auto mb-2 text-primary" size={32} />
                    <p className="text-3xl font-bold">{testResults.length}</p>
                    <p className="text-sm text-muted-foreground">Тестов пройдено</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-primary/5">
                    <Icon name="TrendingUp" className="mx-auto mb-2 text-primary" size={32} />
                    <p className="text-3xl font-bold">
                      {Math.round(testResults.reduce((acc, t) => acc + (t.score / t.maxScore * 100), 0) / testResults.length)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Средний балл</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">ОГЭ</CardTitle>
                  <CardDescription>Прогресс по заданиям ОГЭ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Понимание основного содержания</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Запрашиваемая информация</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Полное понимание текста</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">ЕГЭ</CardTitle>
                  <CardDescription>Прогресс по заданиям ЕГЭ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Установление соответствий</span>
                      <span className="font-medium">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Выбор правильного ответа</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Множественный выбор</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'instructions' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold font-heading mb-2">Инструкции</h2>
              <p className="text-muted-foreground">Всё, что нужно знать о формате экзаменов</p>
            </div>

            {instructions.map((section, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="text-primary mt-0.5 flex-shrink-0" size={20} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Icon name="Info" className="text-primary" size={24} />
                  Полезные советы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Icon name="Volume2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold mb-1">Используйте повторы</p>
                    <p className="text-sm text-muted-foreground">
                      Слушайте каждую запись минимум 2-3 раза на разных скоростях для лучшего понимания
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="Gauge" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold mb-1">Регулируйте скорость</p>
                    <p className="text-sm text-muted-foreground">
                      Начинайте с медленной скорости (0.75x), постепенно увеличивая до нормальной и быстрой
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="Calendar" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold mb-1">Занимайтесь регулярно</p>
                    <p className="text-sm text-muted-foreground">
                      20-30 минут ежедневной практики эффективнее, чем длительные сессии раз в неделю
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;